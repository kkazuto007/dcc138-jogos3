function Scene(params) {
    var exemplo ={
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        mapindice: 11,
        teleportes: 0,
        set: 0,
        chefe: 0,
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
        if(this.sprites[i].vida <=0){
            this.sprites[i].morto = 1;
        }
        if(this.sprites[i].morto){
            if(this.sprites[i].props.tipo === "rider" || this.sprites[i].props.tipo === "eldritch3"){
                boss1defeated = 1;
            }
            this.toRemove.push(this.sprites[i]);
        }
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].colidiuCom(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="pulo"){
                    this.sprites[i].pulo = 1;
                }
                if(this.sprites[i].props.tipo === "seeker"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "charger"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "rider"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "eldritch"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "eldritch2"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "eldritch3"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "hatyoukai"
                && this.sprites[j].props.tipo ==="tiro"){
                    this.toRemove.push(this.sprites[j]);
                    this.sprites[i].vida--;
                }
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="seeker"){
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="charger"){
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="eldritch1"){
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="eldritch2"){
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="eldritch3"){
                    this.sprites[i].vida--;
                }
                else 
                if(this.sprites[i].props.tipo === "pc"
                && this.sprites[j].props.tipo ==="hatyoukai"){
                    this.sprites[i].vida--;
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
                else
                if(this.sprites[i].props.tipo === "bearrider"
                && this.sprites[j].props.tipo ==="teleportedir"){
                    this.sprites[i].x = 80;
                    this.sprites[i].y = this.sprites[i].y;
                    this.mapindice++;
                    this.teleportes = 0;
                    this.set = 0;
                    this.limpezaSprites();
                }
                else
                if(this.sprites[i].props.tipo === "bearrider"
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
        this.sprites[i].props.tipo != "bearrider"){
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
                var npc = new Sprite({ x: 480, y: 440, w:32, h: 32, props: { tipo: "seeker" }, vida: 1, comportar: flutuante(pc)});
                cena2.adicionar(npc);
                this.set = 1;
            }
            break;
        case 1:
            ctx.drawImage(mapAssets.img("toyroom3"),0,0,800,640,0,0,canvas.width,canvas.height);
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 192, y: 480, w:32, h: 32, props: { tipo: "seeker" }, vida: 1, comportar: flutuante(pc)});
                cena2.adicionar(npc);
                var npc2 = new Sprite({ x: 576, y: 480, w:32, h: 32, props: { tipo: "seeker" }, vida: 1, comportar: flutuante(pc)});
                cena2.adicionar(npc2);
                this.set = 1;
            }
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
            if(this.set <=0.5){
                pc.props.tipo = "pc";
                pc.props.riding = 0;
                pc.modelo = 1;
                pc.shadow = 0;
                this.set = 1;
            }
            break;
        //bridge
        case 5:
            ctx.drawImage(mapAssets.img("bridge"),0,0,300,480,0,0,canvas.width,canvas.height);
            if(this.set <=0.5){
                var npc = new Sprite({ x: 480, y: 480, w:32, h: 32, lado: 0, props: { tipo: "charger" }, vida: 5, comportar: charge(pc)});
                var npc2 = new Sprite({ x: 200, y: 480, w:32, h: 32, lado: 0, props: { tipo: "charger" }, vida: 5, comportar: charge(pc)});
                cena2.adicionar(npc);
                cena2.adicionar(npc2);
                pc.props.tipo = "bearrider";                
                pc.props.riding = 1;

                this.set = 1;
            }
            break;
        case 6:
            ctx.drawImage(mapAssets.img("bridge"),0,0,600,480,0,0,canvas.width,canvas.height);
            pc.props.tipo = "bearrider";
            if(this.set <=0.5){
                this.map[this.mapindice].cells[1][14] = 1;
                this.map[this.mapindice].cells[2][14] = 1;
                this.map[this.mapindice].cells[1][15] = 1;
                this.map[this.mapindice].cells[2][15] = 1;

                this.map[this.mapindice].cells[22][14] = 1;
                this.map[this.mapindice].cells[23][14] = 1;
                this.map[this.mapindice].cells[22][15] = 1;
                this.map[this.mapindice].cells[23][15] = 1;
                var general = new Sprite({ x: 480, y: 480, w:32, h: 32, lado: 0, props: { tipo: "rider" }, vida: 20, comportar: charge(pc)});
                cena2.adicionar(general);
                this.set = 1;
            }
            break;
        case 7:
            ctx.drawImage(mapAssets.img("bridge"),300,0,300,480,0,0,canvas.width,canvas.height);
            if(this.set <=0.5){
                pc.props.tipo = "bearrider";
                pc.props.riding = 1;
                var npc2 = new Sprite({ x: 480, y: 480, w:32, h: 32, lado: 0, props: { tipo: "charger" }, vida: 5, comportar: charge(pc)});
                cena2.adicionar(npc2);
                this.set = 1;
            }
            break;
        //void
        case 8:
            ctx.drawImage(mapAssets.img("void3"),0,0,640,576,0,0,canvas.width,canvas.height);
            if(this.set <= 0.5){
                pc.props.tipo = "pc";
                pc.props.riding = 0;
                pc.modelo = 1;
                pc.shadow = 1;
                var npc = new Sprite({ x: 120, y: 192, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 8, comportar: eldritch(pc)});
                cena2.adicionar(npc);
                var npc2 = new Sprite({ x: 460, y: 120, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 8, comportar: eldritch(pc)});
                cena2.adicionar(npc2);
                var npc3 = new Sprite({ x: 360, y: 430, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 8, comportar: eldritch(pc)});
                cena2.adicionar(npc3);
                this.set = 1;
            }
            break
        case 9:
            ctx.drawImage(mapAssets.img("void4"),0,0,640,576,0,0,canvas.width,canvas.height);
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 360, y: 480, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 3, comportar: eldritch(pc)});
                cena2.adicionar(npc);
                var npc2 = new Sprite({ x: 300, y: 480, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 3, comportar: eldritch(pc)});
                cena2.adicionar(npc2);
                var npc3 = new Sprite({ x: 240, y: 480, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 3, comportar: eldritch(pc)});
                cena2.adicionar(npc3);
                var npc4 = new Sprite({ x: 340, y: 340, w:32, h: 32, props: { tipo: "eldritch1" }, vida: 3, comportar: eldritch(pc)});
                cena2.adicionar(npc4);
                this.set = 1;
            }
            break
        case 10:
            ctx.drawImage(mapAssets.img("void3"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            break;
        case 11:
            ctx.fillStyle = "dimgray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(mapAssets.img("void1"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            ctx.fillRect(704, 448, 64, 64);
            ctx.fillRect(32, 448, 64, 64);
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 480, y: 480, w:128, h: 128, props: { tipo: "eldritch3" }, vida: 12, comportar: boss(pc)});
                cena2.adicionar(npc);
                this.set = 1;
            }
            if(boss1defeated){  
              this.map[this.mapindice].cells[1][14].tipo = 0;
              this.map[this.mapindice].cells[2][14].tipo = 0;
              this.map[this.mapindice].cells[1][15].tipo = 0;
              this.map[this.mapindice].cells[2][15].tipo = 0;
              this.map[this.mapindice].cells[22][14].tipo = 0;
              this.map[this.mapindice].cells[23][14].tipo = 0;
              this.map[this.mapindice].cells[22][15].tipo = 0;
              this.map[this.mapindice].cells[23][15].tipo = 0;
            }
            break;
        case 12:
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(mapAssets.img("void2"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 480, y: 480, w:64, h: 64, props: { tipo: "eldritch2" }, vida: 4, comportar: eldritch(pc)});
                var npc2 = new Sprite({ x: 360, y: 480, w:64, h: 64, props: { tipo: "eldritch2" }, vida: 4, comportar: eldritch(pc)});
                cena2.adicionar(npc);
                cena2.adicionar(npc2);
                this.set = 1;
            }
            break;
        case 13:
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);    
            ctx.drawImage(mapAssets.img("void1"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            if(this.set <= 0.5){
                var npc = new Sprite({ x: 9*32, y: 96, w:64, h: 64, props: { tipo: "eldritch2" }, vida: 4, comportar: eldritch(pc)});
                var npc2 = new Sprite({ x: 360, y: 480, w:64, h: 64, props: { tipo: "eldritch2" }, vida: 4, comportar: eldritch(pc)});
                cena2.adicionar(npc);
                cena2.adicionar(npc2);
                this.set = 1;
            }
            break;
        case 14:
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);    
            ctx.drawImage(mapAssets.img("void1"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            pc.modelo = 0;
            pc.shadow = 1;
            break;
        case 15:
            ctx.fillStyle = "azure";
            ctx.fillRect(0, 0, canvas.width, canvas.height);    
            ctx.drawImage(mapAssets.img("void2"),0,0,640,576,0,0,canvas.width,canvas.height);
            ctx.drawImage(mapAssets.img("cocoon"),0,0,160,144,0,0,canvas.width,canvas.height);
            ctx.fillStyle = "black";
            if(this.set <= 0.5){
                var hatyoukai = new Sprite({ x: 400, y: 360, w:64, h: 64, cooldown: 10, props: { tipo: "hatyoukai" }, vida: 35, comportar: dialogo(pc)});
                cena2.adicionar(hatyoukai);
                this.set = 1;
            }
            break;
        default:
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