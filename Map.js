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
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    cor = "black";
                    ctx.fillStyle = cor;
                    ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                    break;
                case 1000:
                    cor = "darkred";
                    ctx.fillStyle = cor;
                    ctx.fillRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                    break;

                //desenha blocks: (ate ter cenário pronto)
                default:
                    cor = "black";
                    ctx.strokeRect(c * this.SIZE, l * this.SIZE, this.SIZE, this.SIZE);
                    break;
            }
        }
    }
}
