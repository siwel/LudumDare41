import BaseSprite from "../BaseSprite";

export default class Bullet extends BaseSprite {
    constructor ()
    {
        super('assets/bunny.png', 10, 10);
        this.sprite.x = -10;
        this.isMoving =false;
    }

    moveBullet(yAxis) {

        if(yAxis)
        {
            this.sprite.y = yAxis;
        }

        this.isMoving = true;

        requestAnimationFrame(()=>{
            this.sprite.x+=10;

            if(this.sprite.x > window.innerWidth/2){
                this.sprite.alpha = (window.innerWidth / this.sprite.x) - 1.3;
            }

            if(this.sprite.x > window.innerWidth){
                this.sprite.x = -10;
                this.sprite.alpha = 1;
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

    isBulletMoving() {
        return this.isMoving;
    }
}