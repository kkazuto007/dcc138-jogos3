function Scene(params) {
    var exemplo ={
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        mapindice: 0
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
                }
                else
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="teleporteesq"){
                    this.sprites[i].x = 720;
                    this.sprites[i].y = this.sprites[i].y;
                    this.mapindice--;
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
    this.map.desenhar(this.ctx);
}

Scene.prototype.scenario = function(){
    switch(this.mapindice){
        case 0:
            ctx.drawImage(mapAssets.img("toyroom"),0,0,800,640,0,0,canvas.width,canvas.height);
            break;
        case 1:
            break
    }
    }


Scene.prototype.passo = function(dt){
    this.limpar();
    this.scenario();
    this.desenhar();
    this.desenharMapa();
    this.comportar();

    this.mover(dt);
    this.checaColisao();
    this.removeSprites();
}