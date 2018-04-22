import * as PIXI from "pixi.js";

export default class IngredientCardView {

    constructor(ingredients, location) {
        var background = PIXI.Texture.fromImage('assets/IngredientCardBG.png');

        this.container = new PIXI.Sprite(background);
        this.container.anchor = new PIXI.Point(1, 0.5);
        this.location = location;
        this.ingredients = ingredients
    }

    init(location) {

        this.plate = PIXI.Texture.fromImage('assets/bunny.png');

        // Create a 5x5 grid of bunnies
        for (var i = 0; i < this.ingredients.length; i++) {
            var bunny = new PIXI.Sprite(this.plate);
            bunny.anchor.set(0.5);
            bunny.x = (i ) * 25 - 80;
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