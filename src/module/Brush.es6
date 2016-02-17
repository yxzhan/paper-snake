
class Brush {
    constructor(type = 'pencil', color = '#333333', width=10){
        this.type = type;
        this.color = color;
        this.width = width;
    }
}
var brush = new Brush();
module.exports = brush;