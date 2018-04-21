import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';
import Ingredient from './components/Ingredient';
import IngredientCardData from "./components/plate_model/IngredientCardData";

export default class Game {
    constructor () {
        this.activeIngredients = [];

        this.generateIngratiateCardData();
    }

	init () {
        var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        document.body.appendChild(app.view);

        const belt = new ConveyerBelt(app.screen.width / 20, app.screen.height);

        belt.sprite.anchor.set(0.5);

        belt.sprite.x = app.screen.width / 2;
        belt.sprite.y = app.screen.height / 2;

        app.stage.addChild(this.ingratiateCardData.getPlate());
        app.stage.addChild(this.ingratiateCardData2.getPlate());
        app.stage.addChild(this.ingratiateCardData3.getPlate());


        belt.start();

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
        const ingredientType = Game.ingredients[Math.floor(Math.random() * Game.ingredients.length)];
        return new Ingredient(ingredientType, width, height);
    }

    static get ingredients() { 
        return ['onion', 'tomato', 'carrot', 'celery']; 
    }

    generateIngratiateCardData () {

        this.location = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.25
        };

        this.ingratiateCardData = new IngredientCardData(['onion', 'chess','carrot'],  this.location );
        this.ingratiateCardData.init();

        this.location2 = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.5
        };

        this.ingratiateCardData2 = new IngredientCardData(['onion', 'chess', 'bun', 'beef'],  this.location2 );
        this.ingratiateCardData2.init();

        this.location3 = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.75
        };

        this.ingratiateCardData3 = new IngredientCardData(['onion', 'chess'],  this.location3 );
        this.ingratiateCardData3.init();

    }

}
