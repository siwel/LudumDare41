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
         *
         * @type {number}
         */
        const sectionHeight = this.app.screen.height / 3;
        this.location = {
            x : this.app.screen.width,
            y : sectionHeight * this.tableNumber + (sectionHeight/2)
        };

        this.food = Recipes.food[Math.floor(Math.random() * Recipes.food.length)]

        /**
         * @type {Recipes}
         */
        this.recipe = Recipes.recipes[this.food];


        console.log(this.recipe);

        /**
         * @type {Plate}
         */
        this.plate = new Plate(30,30,this.location);

        /**
         * @type {Customer}
         */
        this.customer = new Customer();


        this.ingratiateCard = new IngredientCardData(this.recipe,  this.location );
        this.ingratiateCard.init();
        this.app.stage.addChild(this.ingratiateCard.getPlate());
        this.app.stage.addChild(this.plate.sprite)

    }


    addIngratiate(){

    }

}