import BaseSprite from "../BaseSprite";
import * as PIXI from "pixi.js";

/**
 * Gosh this class is shameful - #hackathon hours before deadline
 */
export default class Customer {

    constructor(app, tableNumber, location) {

        this.app = app;

        this._location = location;
        this._initDizzy();
        this._initHappy();
        this._initIdle();

        // setTimeout(() => this.playHappyAnimation(), 2000);

        this.playIdleAnimation();
    }

    _initDizzy(){
        var frames = [];
        for (var i = 0; i < 60; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('Armature_animtion0_'+val+'.png'));
        }

        this.dizzyAnimation = new PIXI.extras.AnimatedSprite(frames);
        this.dizzyAnimation.loop = true;
        this.dizzyAnimation.x = this._location.x - 200;
        this.dizzyAnimation.y = this._location.y - 50;
        this.app.stage.addChild(this.dizzyAnimation);
    }

    _initHappy(){
        var frames = [];
        for (var i = 1; i < 28; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('customerhappy00'+val+'.png'));
        }

        this.happyAnimation = new PIXI.extras.AnimatedSprite(frames);
        this.happyAnimation.loop = true;
        this.happyAnimation.x = this._location.x - 200;
        this.happyAnimation.y = this._location.y - 50;
        this.app.stage.addChild(this.happyAnimation);
    }

    _initIdle(){
        var frames = [];
        for (var i = 1; i < 27; i++) {
            var val = i < 10 ? '0' + i : i;

            // magically works since the spritesheet was loaded with the pixi loader
            frames.push(PIXI.Texture.fromFrame('customeridle00'+val+'.png'));
        }

        this.idleAnimation = new PIXI.extras.AnimatedSprite(frames);
        this.idleAnimation.loop = true;
        this.idleAnimation.x = this._location.x - 200;
        this.idleAnimation.y = this._location.y - 50;
        this.app.stage.addChild(this.idleAnimation);
    }

    switchAnimation(type){

        this.dizzyAnimation.alpha = 0;
        this.happyAnimation.alpha = 0;
        this.idleAnimation.alpha = 0;

        if(type === "happy")
        {
            this.happyAnimation.alpha = 1;
        }
        else if (type === "dizzy")
        {
            this.dizzyAnimation.alpha = 1;
        }
        else if (type === "idle")
        {
            this.idleAnimation.alpha = 1;
        }

    }

    destroy() {
        this.stopAnimation();
        this.dizzyAnimation.destroy();
        this.happyAnimation.destroy();
        this.idleAnimation.destroy();
    }

    stopAnimation(){
        if(this.timeout){
            clearTimeout(this.timeout);
        }
    }

    playDizzyAnimation(){
        this.switchAnimation("dizzy");
        this.stopAnimation();

        this.dizzyAnimation.loop = true;
        this.dizzyAnimation.play();

        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.dizzyAnimation.loop = false;
            this.playIdleAnimation();
        }, 2000)
    }

    playHappyAnimation(){
        this.switchAnimation("happy");
        this.stopAnimation();

        this.happyAnimation.loop = true;
        this.happyAnimation.play();

        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.happyAnimation.loop = false;
            this.playIdleAnimation();
        }, 2000)
    }

    playIdleAnimation(){
        this.switchAnimation("idle");
        this.stopAnimation();

        this.idleAnimation.loop = true;
        this.idleAnimation.play();
    }



}