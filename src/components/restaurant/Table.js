import Plate from "./Plate";
import Customer from "./Customer";
import IngredientCardData from "../ingredients/IngredientCardData";
import Game from "../../Game";
import Recipes from "../../Recipes";
import RestaurantManager from "./RestaurantManager";

export default class Table {


    constructor(app, tableNumber){

        console.log(`ADDING A NEW TABLE AT ${tableNumber}`);

        /**
         * 
         */
        this.app = app;

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

        const sectionHeight = this.app.screen.height / 3;
        this.location = {
            x : this.app.screen.width,
            y : sectionHeight * this.tableNumber + (sectionHeight/2)
        };
        this.ingratiateCard = new IngredientCardData(['onion', 'chess','carrot'],  this.location );
        this.ingratiateCard.init();
        this.app.stage.addChild(this.ingratiateCard.getPlate());

    }


    addIngratiate(){

    }

}