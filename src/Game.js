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
        this.belt = null;
        this.gun = null;
        this.restaurantManager = null;
    }

	init () {
        this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        document.body.appendChild(this.app.view);

        this.initBelt();
        this.initGun();

        this.restaurantManager = new RestaurantManager(this.app.stage);

        // Listen for animate update
        this.app.ticker.add(delta => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            // belt.rotation += 0.1 * delta;
        });
    }

    initBelt() {
        this.belt = new ConveyerBelt(this.app.screen.width / 20, this.app.screen.height);
        this.belt.sprite.interactive = true;

        this.belt.sprite.x = this.app.screen.width / 2;
        this.belt.sprite.y = this.app.screen.height / 2;
        this.belt.setIngredientHeight(this.app.screen.height / 25);

        this.app.stage.addChild(this.belt.sprite);

        this.belt.start();

        // Temp until we have working gun
        this.belt.sprite.on('click', event => {
            this.belt.registerHit(event.data.global.y);
        })

        setInterval(() => {
            const newIngredient = this.getNextIngredient(this.app.screen.width / 25, this.app.screen.height / 25);

            newIngredient.sprite.x = this.app.screen.width / 2;
            newIngredient.sprite.y = 0;

            this.belt.addIngredient(newIngredient.sprite);

            this.app.stage.addChild(newIngredient.sprite);
        }, 1500);
    }

    initGun() {
        const gun = new Gun(this.app.screen.height / 2);
        this.app.stage.addChild(gun.sprite);
    }
    
    getNextIngredient(width, height) {
        const ingredientType = Recipes.ingredients[Math.floor(Math.random() * Recipes.ingredients.length)];
        return new Ingredient(ingredientType, width, height);
    }

}
