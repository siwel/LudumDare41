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

        /**
         * The ingredient we have been given
         * @type {Array}
         */
        this.ingredients = [];

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


    addIngredient(ingredient){

        if(this.ingredients.includes(ingredient)){
            console.log(`WRONG INGREDIENT: WE ALREADY HAVE ${ingredient}`);
            return false;
        }

        if(this.recipe.includes(ingredient) !== true)
        {
            console.log(`WRONG INGREDIENT ${ingredient}: EXPECTED ${this.recipe}`);
            //WE HAVE ADDED THE WRONG INGREDIENT
            //TODO: INFORM PLATE, CARD AND CUSTOMER
            return false;
        }

        this.ingredients.push(ingredient);
        this.ingratiateCard.addIngredient(ingredient);
    }

}