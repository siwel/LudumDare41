import Plate from "./Plate";
import Customer from "./Customer";
import IngredientCardData from "../ingredients/IngredientCardData";
import Game from "../../Game";
import Recipes from "../../Recipes";
import RestaurantManager from "./RestaurantManager";

export default class Table {


    constructor(stage, tableNumber){

        console.log(`ADDING A NEW TABLE AT ${tableNumber}`);

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
        this.recipe = Recipes.recipes[Math.floor(Math.random() * Recipes.recipes.length)];

        /**
         * @type {Plate}
         */
        this.plate = new Plate();

        /**
         * @type {Customer}
         */
        this.customer = new Customer();


        this.location = {
            x : window.innerWidth,
            //FIXME: THIS LOGIC
            y : (window.innerHeight / 3 ) * ( this.tableNumber + 1)
        };
        this.ingratiateCard = new IngredientCardData(['onion', 'chess','carrot'],  this.location );
        this.ingratiateCard.init();
        this.stage.addChild(this.ingratiateCard.getPlate());

    }


    addIngratiate(){

    }

}