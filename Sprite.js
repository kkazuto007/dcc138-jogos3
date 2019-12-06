function Sprite(params = {}) {
    var exemplo = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        h: 10,
        w: 10,
        a: 0,
        va: 0,
        vm: 0,
        vida: 100,
        pulo: 0,
        morto: 0,
        comportamentoativo: 0,
        rate: 0,
        lado: 1,
        frame: 0,
        modelo: 1,
        shadow: 0,
        spawn: {},
        props: {},
        cooldown: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
        dialogo: 0,
        comportar: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function (ctx) {
    ctx.save(); 
    ctx.translate(this.x, this.y);

    if (this.vx >= 0) {
        var F = Math.floor(this.frame * this.vx/30);
    }
    else {
        var F = Math.floor(this.frame * (-1) * this.vx/30);
    }
    //pc
    if(this.props.tipo === "pc"){
        ctx.drawImage(this.scene.assets.img("bear"),
        F%2 * 16 + (this.modelo * 32),
        Math.floor(this.lado) * 16 + (this.shadow * 32),
        16,
        16,
        -this.w/2,
        -this.h/2,
        this.w,
        this.h
        );
        ctx.fillStyle = 'red';
        ctx.fillRect(-this.vida/4, 16, this.vida/2, 2);
        ctx.fillStyle = 'black';
    }
    else if (this.props.tipo === "tiro"){
        ctx.drawImage(this.scene.assets.img("pill"),
        0,
        0,
        16,
        16,
        -this.w/2,
        -this.h/2,
        this.w,
        this.h
        );
    }


    //toyroom
    else if(this.props.tipo === "seeker" ){
        if(this.comportamentoativo <= 0.5){
            ctx.drawImage(this.scene.assets.img("seeker"),
                0,
                0,
                32,
                32,
                -this.w/2,
                -this.h/2,
                this.w,
                this.h
            );
        }
        else if(this.comportamentoativo >= 0.5){
                ctx.drawImage(this.scene.assets.img("seeker"),
                32,
                0,
                32,
                32,
                -this.w/2,
                -this.h/2,
                this.w,
                this.h
            );
        }
        ctx.fillStyle = 'lightblue';
        ctx.fillRect(-this.vida/2, 16, this.vida, 2);
        ctx.fillStyle = 'black';
    }
    else if(this.props.tipo === "pulo"){
        ctx.drawImage(mapAssets.img("toytiles"),
        64,
        0,
        64,
        64,
        -this.w/2,
        -this.h/2,
        this.w,
        this.h
        );
    }

    //bridge
    else if(this.props.tipo === "bearrider" ){
        ctx.drawImage(this.scene.assets.img("rider"),
        F%2 * 32,
        Math.floor(this.lado) * 32,
        32,
        32,
        -this.w/2,
        -this.h/2,
        this.w*2,
        this.h*2
       );
       ctx.fillStyle = 'red';
       ctx.fillRect(-this.vida/4, 48, this.vida/2, 2);
       ctx.fillStyle = 'black';
    }
    else if(this.props.tipo === "charger" ){
        ctx.drawImage(this.scene.assets.img("rider2"),
        F%2 * 32,
        Math.floor(this.lado) * 32,
        32,
        32,
        -this.w/2,
        -this.h/2,
        this.w*2,
        this.h*2
       );
       ctx.fillStyle = 'darkred';
       ctx.fillRect(-this.vida/2, 48, 10*this.vida, 2);
       ctx.fillStyle = 'black';
    }
    else if(this.props.tipo === "rider" ){
        ctx.drawImage(this.scene.assets.img("rider3"),
        F%2 * 32,
        Math.floor(this.lado) * 32,
        32,
        32,
        -this.w/2,
        -this.h/2,
        this.w*2,
        this.h*2
       );
       ctx.fillStyle = 'red';
       ctx.fillRect(-this.vida/2, 48, 5*this.vida, 2);
       ctx.fillStyle = 'black';
    }

    //void
    else if(this.props.tipo === "eldritch1" ){
        ctx.fillRect(0, 0, 32, 32);
        if(this.comportamentoativo <= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch1"),
              0,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
         else if(this.comportamentoativo >= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch1"),
              32,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
         ctx.fillStyle = 'darkred';
         ctx.fillRect(-this.vida/2, 16, this.vida, 2);
         ctx.fillStyle = 'black';
    }
    else if(this.props.tipo === "eldritch2" ){
        if(this.comportamentoativo <= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch2"),
              0,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
         else if(this.comportamentoativo >= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch2"),
              32,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
         ctx.fillStyle = 'darkred';
         ctx.fillRect(-this.vida/2, 16, this.vida, 2);
         ctx.fillStyle = 'black';
    }
    else if(this.props.tipo === "eldritch3" ){
        if(this.comportamentoativo <= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch1"),
              0,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
         else if(this.comportamentoativo >= 0.5){
              ctx.drawImage(this.scene.assets.img("eldritch1"),
              32,
              0,
              32,
              32,
              -this.w/2,
              -this.h/2,
              this.w,
              this.h
             );
         }
        ctx.fillStyle = 'white';
        ctx.fillRect(-this.vida/2, 64, 10*this.vida, 16);
        ctx.fillStyle = 'black';
    }    
    else if(this.props.tipo === "hatyoukai" ){
        ctx.drawImage(this.scene.assets.img("hatyoukai"),
            F%3 * 32,
            0,
            32,
            32,
            -this.w/2,
            -this.h/2,
            this.w,
            this.h
        );
        ctx.fillStyle = 'black';
        ctx.fillRect(-this.vida/2, 48, this.vida, 2);
        ctx.fillStyle = 'black';
    }
    ctx.restore();
}



Sprite.prototype.mover = function (dt) {
    this.frame += 16 * dt;
    if (Math.floor(this.frame) >= 20) {
        this.frame = 0;
    }
    if(this.props.tipo === "tiro"){
        if (Math.floor(this.frame) >= 5){
            this.morto = true;
        }
    }
    if(this.props.tipo != 'pc' && this.props.tipo != 'hatyoukai'){
        this.moverNpc(dt);
    }
    else if(this.props.tipo === 'pc'){
        this.moverOrtogonal(dt);
    }
    else if(this.props.tipo === 'tiro'){       
        this.moverBoss(dt);
    }
    else if(this.props.tipo === 'hatyoukai' && this.dialogo >= 1){
        this.moverBoss(dt);
    }
}

Sprite.prototype.moverOrtogonal = function (dt) {
    this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + 980 * dt;


    this.mc = Math.floor(this.x / this.scene.map[this.scene.mapindice].SIZE);
    this.ml = Math.floor(this.y / this.scene.map[this.scene.mapindice].SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}

Sprite.prototype.moverNpc = function (dt) {
    this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + this.ay * dt + 980 * dt;


    this.mc = Math.floor(this.x / this.scene.map[this.scene.mapindice].SIZE);
    this.ml = Math.floor(this.y / this.scene.map[this.scene.mapindice].SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}

Sprite.prototype.moverBoss = function (dt) {
    this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + this.ay * dt ;


    this.mc = Math.floor(this.x / this.scene.map[this.scene.mapindice].SIZE);
    this.ml = Math.floor(this.y / this.scene.map[this.scene.mapindice].SIZE);

    this.aplicaRestricoes(dt);
}

Sprite.prototype.aplicaRestricoes = function (dt) {

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && this.scene.map[this.scene.mapindice].cells[this.mc + 1][this.ml].tipo != 0) {
        dnx = this.scene.map[this.scene.mapindice].SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map[this.scene.mapindice].cells[this.mc - 1][this.ml].tipo != 0) {
        dnx = this.scene.map[this.scene.mapindice].SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map[this.scene.mapindice].cells[this.mc][this.ml + 1].tipo != 0) {
        dny = this.scene.map[this.scene.mapindice].SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map[this.scene.mapindice].cells[this.mc][this.ml - 1].tipo != 0) {
        dny = this.scene.map[this.scene.mapindice].SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map[this.scene.mapindice].SIZE * this.scene.map[this.scene.mapindice].COLUMNS - this.w / 2;
    var MAXY = this.scene.map[this.scene.mapindice].SIZE * this.scene.map[this.scene.mapindice].LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;

}


Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}