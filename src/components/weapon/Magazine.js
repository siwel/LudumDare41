import BaseSprite from "../BaseSprite";

export default class Magazine {


    constructor(maxBullets){

        this._container = new PIXI.Container();
        this.maxBullets = maxBullets;

        const height = window.document.getElementById('game').offsetHeight;


        this.bullets = [];

        for(let i = 0; i < this.maxBullets; i++){
            let bullet = new BaseSprite('assets/characters/potatobullet.png', 21, 12);

            bullet.sprite.rotation = - Math.PI * 2 * 0.25;
            bullet.sprite.x = i * 20 + 20;
            bullet.sprite.y = height - 20;

            this.bullets.push(bullet);

            this._container.addChild(bullet.sprite);
        }

    }


    setRemainingBullets(remaining){

        for(let i = 0; i < this.maxBullets; i++){
            const bullet = this.bullets[i];
            bullet.sprite.alpha = i >= remaining ? 0 : 1;
        }
    }


    init(){

    }
    




    get container(){
        return this._container;
    }

}