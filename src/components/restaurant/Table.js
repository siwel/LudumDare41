import Plate from "./Plate";
import Customer from "./Customer";
import IngredientCardData from "../ingredients/IngredientCardData";
import Game from "../../Game";
import Recipes from "../../Recipes";

export default class Table {


    constructor(stage, tableNumber){

        /**
         * 
         */
        this.stage = stage;

        /**
         *
         */
        this.tableNumber = tableNumber;

        /**
         * @type {Recipes}
         */
        this.recipe = Recipes.recipes[Math.floor(Math.random() * Game.recipes.length)];

        /**
         * @type {Plate}
         */
        this.plate = new Plate();

        /**
         * @type {Customer}
         */
        this.customer = new Customer();


        this.location = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.25
        };
        this.ingratiateCard = new IngredientCardData(['onion', 'chess','carrot'],  this.location );
        this.ingratiateCard.init();
    }


    addIngratiate(){

    }

}