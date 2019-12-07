function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 32,
        COLUMNS: 32,
        SIZE: 32,
        mapindice: [],
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c] };
            }
        }
    }
}


Map.prototype.desenhar = function (ctx) {
    var cor = "black";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
            switch (this.cells[c][l].tipo) {

                //andavel
                case 0:
                    break;

                //solido
                case 1:
                    break;
                
                //toy
                case 2:
                    ctx.drawImage(mapAssets.img("toytiles"),0,0,64,64, c* this.SIZE, l * this.SIZE,this.SIZE,this.SIZE);
                    break;

                //case 3: sustentação

                //void
                case 4:
                    ctx.drawImage(mapAssets.img("voidtile"),0,0,16,16, c* this.SIZE, l * this.SIZE,this.SIZE,this.SIZE);
                    break;
                case 5:
                    ctx.drawImage(mapAssets.img("voidtile2"),0,0,16,16, c* this.SIZE, l * this.SIZE,this.SIZE,this.SIZE);
                    break;

                //montaria    
                case 6:
                    ctx.drawImage(mapAssets.img("mount"),32,32,32,32, c* this.SIZE, l * this.SIZE,this.SIZE,this.SIZE);
                    break;

                //teste    
                case 1000:
                    cor = "darkred";
                    ctx.fillStyle = cor;
                    ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                    break;

                //desenha blocks: (ate ter cenário pronto)
                /*default:
                    cor = "black";
                    ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                    break;*/
            }
        }
    }
}
