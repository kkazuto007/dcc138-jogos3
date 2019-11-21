function Scene(params) {
    var exemplo ={
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        mapindice: 0,
        teleportes: 0
    }
    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);
    sprite.scene = this;
};

Scene.prototype.desenhar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].desenhar(this.ctx);
    }  
};

Scene.prototype.mover = function(dt){
    for(var i = 0; i<this.sprites.length; i++){
        this.sprites[i].mover(dt);
    }  
};

Scene.prototype.comportar = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].comportar){
            this.sprites[i].comportar();
        }
    }  
};


Scene.prototype.limpar = function(){
    this.ctx.clearRect(0,0, this.w, this.h);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].morto){
            this.toRemove.push(this.sprites[i]);
        }
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="pulo"){
                    this.sprites[i].pulo = 1;
                }
                else 
                if(this.sprites[i].props.tipo === "npc"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[i]);
                    this.toRemove.push(this.sprites[j]);
                }
                else
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="teleportedir"){
                    this.sprites[i].x = 80;
                    this.sprites[i].y = this.sprites[i].y;
                    this.mapindice++;
                    this.teleportes = 0;
                }
                else
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="teleporteesq"){
                    this.sprites[i].x = 720;
                    this.sprites[i].y = this.sprites[i].y;
                    this.mapindice--;
                    this.teleportes = 0;
                }
            }
        }
    }  
};

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if(idx>=0){
            this.sprites.splice(idx,1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.desenharMapa = function () {
    this.map[this.mapindice].desenhar(this.ctx);
}

Scene.prototype.scenario = function(){
    this.map.push(this.map[this.mapindice]); //trocar pro indice NO PRÓPRIO MAPA

    switch(this.map[this.mapindice].mapindice){
        case 0:
            ctx.drawImage(mapAssets.img("toyroom"),0,0,800,640,0,0,canvas.width,canvas.height);
            break;
        case 1:
            ctx.drawImage(mapAssets.img("pleiades"),0,0,800,640,0,0,canvas.width,canvas.height);
            
            break
    }
}

Scene.prototype.setTeleporte = function(){
    if(this.teleportes <= 0){
        var teleportedir = new Sprite({ x: canvas.width-48, y: 300, w:32, h: 640, props: { tipo: "teleportedir" }});
        cena2.adicionar(teleportedir);
        var teleporteesq = new Sprite({ x: 0+48, y: 300, w:32, h: 640, props: { tipo: "teleporteesq" }});
        cena2.adicionar(teleporteesq);
    }
    this.teleportes = 1;
}

Scene.prototype.passo = function(dt){
    this.limpar();
    this.scenario();
    this.setTeleporte();
    this.desenhar();
    this.desenharMapa();
    this.comportar();
    this.mover(dt);
    this.checaColisao();
    this.removeSprites();
}