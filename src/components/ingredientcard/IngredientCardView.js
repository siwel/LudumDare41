import * as PIXI from "pixi.js";

export default class IngredientCardView {

    constructor(ingredients, location) {

        /**
         * @type {PIXI.Point}
         */
        this.location = location;

        /**
         *
         */
        this.ingredients = ingredients;


        let background = PIXI.Texture.fromImage('assets/IngredientCardBG.png');
        this.container = new PIXI.Sprite(background);
        this.container.x = this.location.x;
        this.container.y = this.location.y;
        this.container.anchor = new PIXI.Point(1, 0.5);

        /**
         * @type {Map<String, PIXI.Sprite>}
         */
        this.ingredientToSpriteMap = new Map();


        this.redraw();

    }

    redraw(){

        this.ingredientToSpriteMap.clear();
        this.container.removeChildren();

        this.drawIngredients();
        this.drawMainFoodItem()
    }

    drawIngredients() {

        this.plate = PIXI.Texture.fromImage('assets/bunny.png');

        for (let i = 0; i < this.ingredients.length; i++) {

            let ingredientSprite = new PIXI.Sprite(this.plate);
            ingredientSprite.anchor.set(0.5);
            ingredientSprite.x = (i ) * 25 - 80;
            ingredientSprite.y = Math.floor(1) * 40;
            this.ingredientToSpriteMap.set(this.ingredients[i], ingredientSprite);
            this.container.addChild(ingredientSprite);
        }
    }

    drawMainFoodItem () {
        var bunny = new PIXI.Sprite(this.plate);
        bunny.anchor.set(0.5);
        bunny.x = (1 ) * 25 - 80;
        bunny.y = Math.floor(1) * -40;
        this.container.addChild(bunny);
    }

    getPlate() {
        return this.container;
    }

    addIngredient(ingredient){
        this.ingredients = this.ingredients.filter(e => e !== ingredient);
        this.redraw()
    }

}