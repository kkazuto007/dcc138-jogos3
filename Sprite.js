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
        vida: 1,
        pulo: 0,
        morto: 0,
        rate: 0,
        lado: 1,
        frame: 0,
        spawn: {},
        props: {},
        cooldown: 0,
        color: "blue",
        imune: 0,
        atirando: 0,
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
    if (this.ax >= 0) {
        if (this.ay >= 0) {
            var F = Math.floor(this.frame * this.ax / 10 + this.frame * this.ay / 10 + this.frame * this.rate);
        }
        else {
            var F = Math.floor(this.frame * (-1) * this.ay / 10);
        }
    }
    else {
        var F = Math.floor(this.frame * (-1) * this.ax / 10);
    }
    ctx.fillStyle = "blue";
    ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h);
    ctx.restore();
}

Sprite.prototype.mover = function (dt) {
    this.frame += 4 * dt;
    if (Math.floor(this.frame) >= 20) {
        this.frame = 0;
    }
    this.moverOrtogonal(dt);
}

Sprite.prototype.moverOrtogonal = function (dt) {
    this.a = this.a + this.va*dt;

    this.vx = this.vx + this.ax * dt - this.vx * 0.9 * dt;
    this.vy = this.vy + 980 * dt;


    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);

    this.aplicaRestricoes(dt);
    this.cooldown = this.cooldown - dt;
}


Sprite.prototype.aplicaRestricoes = function (dt) {

    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w / 2);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w / 2);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h / 2);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h / 2);
        dy = Math.max(dny, dy);
    }
    this.vy = dy / dt;
    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS - this.w / 2;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES - this.h / 2;

    if (this.x > MAXX) this.x = MAXX;
    if (this.y > MAXY) {
        this.y = MAXY;
        this.vy = 0;
    }
    if (this.x - this.w / 2 < 0) this.x = 0 + this.w / 2;
    if (this.y - this.h / 2 < 0) this.y = 0 + this.h / 2;
    this.MudancaMapa();

}

Sprite.prototype.MudancaMapa = function (){
    if(this.tipo === 'pc'){
        if(this.x >= canvas.width - 160);
        switch (this.scene.map){
            case mapa1:
                this.x = 100;
                this.scene.map = 'mapa2';
                break;
            case mapa2:
                this.x = 100;
                this.scene.map = 'mapa1';
            default:
                ctx.fillRect(0,0,canvas.width,cavnas.height);
                break;
         }
    }
}

Sprite.prototype.colidiuCom = function (alvo) {
    if (alvo.x + alvo.w / 2 < this.x - this.w / 2) return false;
    if (alvo.x - alvo.w / 2 > this.x + this.w / 2) return false;

    if (alvo.y + alvo.h / 2 < this.y - this.h / 2) return false;
    if (alvo.y - alvo.h / 2 > this.y + this.h / 2) return false;

    return true;
}