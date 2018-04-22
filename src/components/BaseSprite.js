
export default class BaseSprite {
    constructor(imagePath, width, height, tiling) {

        this.pixiSprite = PIXI.Sprite.fromImage(imagePath);

        if(tiling){
            this.pixiSprite = PIXI.extras.TilingSprite.fromImage(imagePath);
        }

        this.pixiSprite.width = width;
        this.pixiSprite.height = height;
        this.pixiSprite.anchor.set(0.5);
    }

    destroy() {
        this.pixiSprite.destroy();
    }

    get sprite() {
        return this.pixiSprite;
    }
    
    get height() {
        return this.pixiSprite.height;
    }
}