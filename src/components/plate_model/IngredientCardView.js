import * as PIXI from "pixi.js";

export default class IngredientCardView {

    constructor(size, location) {
        this.container = new PIXI.Container();
        this.location = location;
    }

    init(location) {

        this.plate = PIXI.Texture.fromImage('assets/bunny.png');

        // Create a 5x5 grid of bunnies
        for (var i = 0; i < 5; i++) {
            var bunny = new PIXI.Sprite(this.plate);
            bunny.anchor.set(0.5);
            bunny.x = (i ) * 25 - 100;
            bunny.y = Math.floor(1) * 40;
            this.container.addChild(bunny);
        }

        this.container.x = this.location.x;
        this.container.y = this.location.y;

        this._mainFoodItem()

    }

    _mainFoodItem () {

        var bunny = new PIXI.Sprite(this.plate);
        bunny.anchor.set(0.5);
        bunny.x = (1 ) * 25 - 80;
        bunny.y = Math.floor(1) * -40;
        this.container.addChild(bunny);
    }

    getPlate() {
        return this.container;
    }
    infoPlate(item){


        return this.container;
    }

}