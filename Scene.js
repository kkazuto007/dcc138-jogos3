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
        teleportes: 0,
        set: 0,
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
                    this.set = 0;
                    this.limpezaSprites();
                }
                else
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="teleporteesq"){
                    this.sprites[i].x = 720;
                    this.sprites[i].y = this.sprites[i].y;
                    this.mapindice--;
                    this.teleportes = 0;
                    this.set = 0;
                    this.limpezaSprites();
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

Scene.prototype.limpezaSprites = function(){
    for(var i = 0; i<this.sprites.length; i++){
        if(this.sprites[i].props.tipo != "pc" &&
        this.sprites[i].props.tipo != "teleporteesq" && 
        this.sprites[i].props.tipo != "teleportedir"){
            this.toRemove.push(this.sprites[i]);
        }
    }
}

Scene.prototype.scenario = function(){
    this.map.push(this.map[this.mapindice]); //trocar pro indice NO PRÓPRIO MAPA
    switch(this.map[this.mapindice].mapindice){
        case 0:
            ctx.drawImage(mapAssets.img("toyroom1"),0,0,800,640,0,0,canvas.width,canvas.height);
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 480, y: 440, w:32, h: 32, props: { tipo: "seeker" }, comportar: flutuante(pc)});
                cena2.adicionar(npc);
                this.set = 1;
            }
            break;
        case 1:
            ctx.drawImage(mapAssets.img("toyroom3"),0,0,800,640,0,0,canvas.width,canvas.height);
            break
        case 2:
            ctx.drawImage(mapAssets.img("toyroom1"),0,0,800,640,0,0,canvas.width,canvas.height); 
            if(this.set <= 0.5){
                var pulo = new Sprite({ x: 290, y: 480, w:64, h: 64, props: { tipo: "pulo" }});
                var pulo2 = new Sprite({ x: 510, y: 480, w:64, h: 64, props: { tipo: "pulo" }});
                this.adicionar(pulo);
                this.adicionar(pulo2);
                this.set = 1;
            }
            break
        case 3:
            ctx.drawImage(mapAssets.img("toyroom2"),0,0,800,640,0,0,canvas.width,canvas.height);
            break
        case 4:
            ctx.drawImage(mapAssets.img("toyroom3"),0,0,800,640,0,0,canvas.width,canvas.height);
            break;
    }
}

Scene.prototype.setTeleporte = function(){
    if(this.teleportes <= 0){
        var teleporteesq = new Sprite({ x: 48, y: 300, w:32, h: 640, props: { tipo: "teleporteesq" }});
        cena2.adicionar(teleporteesq);

        var teleportedir = new Sprite({ x: canvas.width-48, y: 300, w:32, h: 640, props: { tipo: "teleportedir" }});
        cena2.adicionar(teleportedir);

        var teleportecim = new Sprite({ x: 0, y: 0, w:800, h: 32, props: { tipo: "teleportecim" }});
        cena2.adicionar(teleportecim);

        var teleportebai = new Sprite({ x: 0, y: canvas.height-48, w:800, h: 32, props: { tipo: "teleportebai" }});
        cena2.adicionar(teleportebai);
    }
    this.teleportes = 1;
}

Scene.prototype.passo = function(dt){
    this.limpar();
    this.scenario();
    this.setTeleporte();
    this.desenharMapa();
    this.desenhar();
    this.comportar();
    this.mover(dt);
    this.checaColisao();
    this.removeSprites();
}