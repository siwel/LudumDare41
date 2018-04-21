import * as PIXI from "pixi.js";
import IngratiateCardView from "./IngratiateCardView";

export default class IngratiateCardData {

    constructor(ingredients, location) {

        this.location = location;
        this.plateView = new IngratiateCardView(0,this.location);
        this.listIngredients = ingredients;
        this.selectedIngredients = [];
    }
    init() {


        this.plateView.init(this.location);

    }

    getPlate () {

        return this.plateView.getPlate();
    }

    addIngredient (ingredient) {

        this.selectedIngredients.push(ingredient);
    }

    isSelectedIngredientsCorrect () {

        for(var index = 0; index < this.selectedIngredients.length; index++)
        {
            if(this.selectedIngredients[index] !== this.listIngredients[index]) {
                return false
            }
        }

        return true;
    }

    getCurrentWantedIngredient() {
        var index = this.selectedIngredients.length == 0? 0 :  this.selectedIngredients.length;

        console.log(this.selectedIngredients , this.listIngredients[index]);
        return this.plateView.infoPlate(this.listIngredients[index]);
    }



}