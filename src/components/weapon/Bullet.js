import BaseSprite from "../BaseSprite";

export default class Bullet extends BaseSprite {
    constructor ()
    {
        super('assets/characters/potatobullet.png', 19, 11);
        this.sprite.x = -10;
        this.isMoving =false;
        this._hasGonePastBelt = false;
    }

    setStartingX(){
        this.sprite.x = 85;
    }

    moveBullet(yAxis) {

        if(yAxis)
        {
            this.sprite.y = yAxis + 13;
        }

        this.isMoving = true;

        requestAnimationFrame(()=>{
            this.sprite.x+=30;

            if(this.sprite.x > window.innerWidth/2){
                this.sprite.alpha = (window.innerWidth / this.sprite.x) - 1.3;
            }

            if(this.sprite.x > window.innerWidth){
                this.sprite.x = -10;
                this.sprite.alpha = 1;
                this.hasGonePastBelt = false;
                this.isMoving = false;
                return;
            }

            this.moveBullet();
        });


    }

    getX(){

        return this.sprite.x;
    }

    getY(){

        return this.sprite.y;
    }

    get hasGonePastBelt (){
        return this._hasGonePastBelt;
    }

    set hasGonePastBelt (value){
        this._hasGonePastBelt = value
    }

    isBulletMoving() {
        return this.isMoving;
    }
}