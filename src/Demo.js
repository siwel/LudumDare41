import * as PIXI from 'pixi.js';
import IngredientCardData from './components/plate_model/IngredientCardData';

export default  class Demo  {
    constructor() {

        this.generateIngratiateCardData();

	}


	init () {
        var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        document.body.appendChild(app.view);

// create a new Sprite from an image path
        var bunny = PIXI.Sprite.fromImage('assets/bunny.png');

        // center the sprite's anchor point
        bunny.anchor.set(0.5);

        // move the sprite to the center of the screen
        bunny.x = app.screen.width / 2;
        bunny.y = app.screen.height / 2;

        app.stage.addChild(bunny);

        app.stage.addChild(this.ingratiateCardData.getPlate());
        app.stage.addChild(this.ingratiateCardData2.getPlate());
        app.stage.addChild(this.ingratiateCardData3.getPlate());


        // Listen for animate update
        app.ticker.add(function(delta) {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            bunny.rotation += 0.1 * delta;
            //this.plate.getCurrentWantedIngredient()
        });
	}

	generateIngratiateCardData () {

        this.location = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.25
        };

        this.ingratiateCardData = new IngredientCardData(['onion', 'chess'],  this.location );
        this.ingratiateCardData.init();

        this.location2 = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.5
        };

        this.ingratiateCardData2 = new IngredientCardData(['onion', 'chess'],  this.location2 );
        this.ingratiateCardData2.init();

        this.location3 = {
            x : window.innerWidth-100,
            y : window.innerHeight*0.75
        };

        this.ingratiateCardData3 = new IngredientCardData(['onion', 'chess'],  this.location3 );
        this.ingratiateCardData3.init();

    }


}
