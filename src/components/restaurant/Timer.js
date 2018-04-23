import BaseSprite from "../BaseSprite";
import RestaurantManager from "./RestaurantManager";

export default class Timer {

    constructor(location, tableNumber){

        this._container = new PIXI.Container();
        this._tableNumber = tableNumber;

        this._location = location;

        this._container.x = this._location.x - 180;
        this._container.y = this._location.y - 50;


        this.backgroundBar = new BaseSprite('assets/timebar2.png', 61, 20);
        this.backgroundBar.sprite.anchor.set(0, 0.5);
        this._container.addChild(this.backgroundBar.sprite);

        this.timerBar = new BaseSprite('assets/timebar1.png', Timer.WIDTH, 20);
        this.timerBar.sprite.anchor.set(0, 0.5);
        this._container.addChild(this.timerBar.sprite);

        this.clock = new BaseSprite('assets/clock.png', 28, 28);
        this._container.addChild(this.clock.sprite);

        this.timeRemaning = Timer.MAX_TIME;
        this.animate();

        this.isStopped = false;
    }


    animate(){
        requestAnimationFrame(() => {

            if(this.isStopped){
                return;
            }

            this.timeRemaning -= 1;

            if(this.timeRemaning < 0){
                this.stop();
                this.timeRemaning = 0;
                RestaurantManager.getInstance().setTableFailed(this._tableNumber);
            }
            this.timerBar.sprite.width = Timer.WIDTH * (this.timeRemaning/Timer.MAX_TIME);

            this.animate();
        })
    }


    reset(){
        this.timeRemaning = Timer.MAX_TIME;
    }

    stop(){
        this.isStopped = true;
    }

    destory(){
        this.stop();
        this._container.destroy();
    }


    get container (){
        return this._container;
    }


    static get WIDTH(){
        return 61;
    }

    static get MAX_TIME(){
        return Timer.MAX_TIME_MS_SECONDS/16;
    }

    static get MAX_TIME_MS_SECONDS(){
        return 30000;
    }

}