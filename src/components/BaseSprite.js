
export default class BaseSprite {
    constructor(imagePath, width, height) {
        this.pixiSprite = PIXI.Sprite.fromImage(imagePath);
        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
    }

    get sprite() {
        return this.pixiSprite;
    }
}