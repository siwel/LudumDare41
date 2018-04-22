import BaseSprite from "../BaseSprite";
import * as PIXI from "pixi.js";

export default class Customer {

    constructor(app, tableNumber, location) {

        this.app = app;


        var frames = [];
        for (var i = 0; i < 60; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('Armature_animtion0_'+val+'.png'));
        }

        this.dizzyAnimation = new PIXI.extras.AnimatedSprite(frames);
        this.dizzyAnimation.x = location.x - 200;
        this.dizzyAnimation.y = location.y - 50;
        this.app.stage.addChild(this.dizzyAnimation);
    }

    destroy() {
        this.dizzyAnimation.destroy();
    }

    playDizzyAnimation(){
        this.dizzyAnimation.play();
    }



}