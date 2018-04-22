import * as PIXI from "pixi.js";
import Ingredient from "../Ingredient";

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
         * @type {Map<String, Ingredient>}
         */
        this.ingredientToSpriteMap = new Map();


        this.redraw();

    }

    destroy() {
        this.container.destroy();
    }

    redraw(){

        this.ingredientToSpriteMap.clear();
        this.container.removeChildren();

        this.drawIngredients();
        this.drawMainFoodItem()
    }

    drawIngredients() {

        for (let i = 0; i < this.ingredients.length; i++) {

            let ingredient = new Ingredient(this.ingredients[i], 30, 30);
            ingredient.x = (i ) * 25 - 80;
            ingredient.y = Math.floor(1) * 40;
            this.ingredientToSpriteMap.set(this.ingredients[i], ingredient);
            this.container.addChild(ingredient.sprite);
        }
    }

    drawMainFoodItem () {
        let sprite = PIXI.Texture.fromImage('assets/bunny.png');
        let bunny = new PIXI.Sprite(sprite);
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