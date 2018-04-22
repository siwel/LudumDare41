import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';
import Ingredient from './components/Ingredient';
import Gun from './components/Gun';
import IngredientCardData from "./components/ingredients/IngredientCardData";
import RestaurantManager from "./components/restaurant/RestaurantManager";
import Recipes from "./Recipes";

export default class Game {
    constructor () {
        this.activeIngredients = [];
    }

	init () {
        var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        document.body.appendChild(app.view);

        const belt = new ConveyerBelt(app.screen.width / 20, app.screen.height);
        belt.sprite.interactive = true;

        belt.sprite.anchor.set(0.5);

        belt.sprite.x = app.screen.width / 2;
        belt.sprite.y = app.screen.height / 2;

        const gun = new Gun(app.screen.height / 2);
        
        app.stage.addChild(belt.sprite);
        app.stage.addChild(gun.sprite);

        belt.setIngredientHeight(app.screen.height / 25);

        app.stage.addChild(belt.sprite);


        this.restaurantManager = new RestaurantManager(app.stage);

        belt.start();

        // Temp until we have working gun
        belt.sprite.on('click', event => {
            belt.registerHit(event.data.global.y);
        })

        setInterval(() => {
            const newIngredient = this.getNextIngredient(app.screen.width / 25, app.screen.height / 25);

            newIngredient.sprite.anchor.set(0.5);
            newIngredient.sprite.x = app.screen.width / 2;
            newIngredient.sprite.y = 0;

            belt.addIngredient(newIngredient.sprite);

            app.stage.addChild(newIngredient.sprite);
        }, 1500);

        // Listen for animate update
        app.ticker.add(delta => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            // belt.rotation += 0.1 * delta;
        });
    }
    
    getNextIngredient(width, height) {
        const ingredientType = Recipes.ingredients[Math.floor(Math.random() * Recipes.ingredients.length)];
        return new Ingredient(ingredientType, width, height);
    }

}
