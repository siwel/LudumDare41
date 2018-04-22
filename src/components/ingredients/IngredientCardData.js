import * as PIXI from "pixi.js";
import IngredientCardView from "./IngredientCardView";

export default class IngredientCardData {

    constructor(ingredients, location) {

        this.location = location;
        this.plateView = new IngredientCardView(ingredients,this.location);
        this.selectedIngredients = [];
    }

    getPlate () {
        return this.plateView.getPlate();
    }

    addIngredient (ingredient) {
        this.plateView.addIngredient(ingredient);
        this.selectedIngredients.push(ingredient);
    }

}