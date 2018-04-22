import BaseSprite from "../BaseSprite";

export default class Bullet extends BaseSprite {
    constructor ()
    {
        super('assets/bunny.png', 10, 10);
        this.sprite.x = -10;
    }

    moveBullet(yAxis) {
        this.sprite.y = yAxis;
        this.id = setInterval(()=>{
            this.sprite.x+=1;

            if(this.sprite.x > window.innerWidth){
                clearInterval(this.id);
                this.sprite.x = -10;
            }
        },0);


    }

    getX(){

        return this.sprite.x;
    }
}