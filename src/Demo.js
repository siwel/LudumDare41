import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';

export default  class Demo  {
    constructor() {

	}


	init () {
        var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor : 0x1099bb});
        document.body.appendChild(app.view);

        const belt = new ConveyerBelt(app.screen.width / 20, app.screen.height);

        belt.sprite.anchor.set(0.5);

        belt.sprite.x = app.screen.width / 2;
        belt.sprite.y = app.screen.height / 2;

        app.stage.addChild(belt.sprite);

        // Listen for animate update
        app.ticker.add(delta => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            // belt.rotation += 0.1 * delta;
        });
	}

}
