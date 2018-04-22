import BaseSprite from "../BaseSprite";

export default class Bullet extends BaseSprite {
    constructor ()
    {
        super('assets/bunny.png', 10, 10);
        this.sprite.x = -10;
    }

    moveBullet(yAxis) {

        if(yAxis)
        {
            this.sprite.y = yAxis;
        }

        requestAnimationFrame(()=>{
            this.sprite.x+=10;

            if(this.sprite.x > window.innerWidth/2){
                this.sprite.alpha = (window.innerWidth / this.sprite.x) - 1.5;
            }

            if(this.sprite.x > window.innerWidth){
                this.sprite.x = -10;
                return;
            }

            this.moveBullet();
        });


    }

    getX(){

        return this.sprite.x;
    }
}