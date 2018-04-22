import * as PIXI from "pixi.js";
import IngredientCardView from "./IngredientCardView";

export default class IngredientCardData {

    constructor(ingredients, location, food) {

        this.location = location;
        this.view = new IngredientCardView(ingredients,this.location, food);
        this.selectedIngredients = [];
    }

    destroy() {
        this.view.destroy();
    }

    getPlate () {
        return this.view.getPlate();
    }

    addIngredient (ingredient) {
        this.view.addIngredient(ingredient);
        this.selectedIngredients.push(ingredient);
    }

}