import Plate from "./Plate";
import Customer from "./Customer";
import IngredientCardData from "../ingredientcard/IngredientCardData";
import Game from "../../Game";
import Recipes from "../../Recipes";
import RestaurantManager from "./RestaurantManager";


/**
 * TODO:
 * - Table type, I believe design have two types. Patient (Easy) and Impatient (Hard)
 * - Countdown Timer, and inform the RestaurantManager when the table is leaving
 * - Complected State
 *
 */
export default class Table {


    constructor(app, tableNumber){

        console.log(`ADDING A NEW TABLE AT ${tableNumber}`);

        /**
         * @type PIXI.Application
         */
        this.app = app;

        /**
         * @type Number
         */
        this.tableNumber = tableNumber;

        /**
         * @type {Number}
         */
        const sectionHeight = this.app.screen.height / 3;
        this.location = {
            x : this.app.screen.width,
            y : sectionHeight * this.tableNumber + (sectionHeight/2)
        };

        /**
         * The name of the final item (eg, Spaghetti Bolognese)
         */
        this.food = Recipes.food[Math.floor(Math.random() * Recipes.food.length)];

        /**
         * And array of all the ingredients needed for a recipe (eg. ['tomato', 'carrot'])
         * @type {[String]}
         */
        this.recipe = Recipes.recipes[this.food];

        /**
         * The ingredients list we have been given so far
         * @type {Array}
         */
        this.ingredients = [];

        /**
         * @type {Plate}
         */
        this.plate = new Plate(30,30,this.location);

        /**
         * @type {Customer}
         */
        this.customer = new Customer();


        this.ingredientCard = new IngredientCardData(this.recipe,  this.location );
        this.app.stage.addChild(this.ingredientCard.getPlate());
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
        this.ingredientCard.addIngredient(ingredient);
        this.plate.updatePlate();
        console.log(`CORRECT INGREDIENT ${ingredient}: OF ${this.recipe}`);
    }

}