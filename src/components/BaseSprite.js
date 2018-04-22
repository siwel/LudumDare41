
export default class BaseSprite {
    constructor(imagePath, width, height) {
        this.pixiSprite = PIXI.Sprite.fromImage(imagePath);
        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
        this.pixiSprite.anchor.set(0.5);
    }

    get sprite() {
        return this.pixiSprite;
    }
    
    get height() {
        return this.pixiSprite.height;
    }
}