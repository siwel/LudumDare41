
export default class ConveyerBelt {
    constructor(width, height) {
        this.belt = PIXI.Sprite.fromImage('assets/bunny.png');
        this.belt.width = width;
        this.belt.height = height;
    }

    get sprite() {
        return this.belt;
    }
}