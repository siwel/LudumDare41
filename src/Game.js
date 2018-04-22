import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';
import Ingredient from './components/Ingredient';
import Gun from './components/weapon/Gun';
import IngredientCardData from "./components/ingredientcard/IngredientCardData";
import RestaurantManager from "./components/restaurant/RestaurantManager";
import Recipes from "./Recipes";
import Keyboard from './components/Keyboard';
import HealthBar from './components/HealthBar';

// #GameJam - turn string e.g. '1234px' into just the value as a number
const pxToNum = strValue => {
    const arr = strValue.split('');
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!Number.isInteger(+(arr[i]))) break;

        newArr.push(arr[i]);
    }

    return +(newArr.join(''));
}

export default class Game {

    constructor () {
        this.activeIngredients = [];
        this.belt = null;
        this.gun = null;
        this.restaurantManager = null;
    }

    init() {
        const loader = PIXI.loader;
        loader.add('assets/characters/test.json');
        loader.load((loader, resources) => this.onLoad(loader, resources));
    }


	onLoad (loader, resources) {
        const gameEl = document.getElementById('game');
        const style = window.getComputedStyle(gameEl);

        this.app = new PIXI.Application(pxToNum(style.getPropertyValue('width')), pxToNum(style.getPropertyValue('height')), {backgroundColor : 0x1099bb});
        gameEl.appendChild(this.app.view);

        this.initTopBar();
        this.initBelt();
        this.initGun();
        this.initController();

        this.restaurantManager = new RestaurantManager(this.app);

        // Listen for animate update
        this.app.ticker.add(delta => {
            // just for fun, let's rotate mr rabbit a little
            // delta is 1 if running at 100% performance
            // creates frame-independent transformation
            // belt.rotation += 0.1 * delta;


        });
    }

    initTopBar() {
        const barEl = document.getElementById('topBar');
        const style = window.getComputedStyle(barEl);

        this.topBar = new PIXI.Application(pxToNum(style.getPropertyValue('width')), pxToNum(style.getPropertyValue('height')), {backgroundColor: 0xFF0000})
        barEl.appendChild(this.topBar.view);

        const logo = new PIXI.Text('Hangover Kitchen', { fontFamily : 'Wingdings', fontSize: 24, fill: 0x000000, align: 'center' });
        this.topBar.stage.addChild(logo);

        const healthBar = new HealthBar(this.topBar.screen.width, this.topBar.screen.height / 2);
        healthBar.sprite.x = this.topBar.screen.width / 2;
        healthBar.sprite.y = this.topBar.screen.height / 2;
        this.topBar.stage.addChild(healthBar.sprite);
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

            const ingredient = this.belt.lastHit;

            if(ingredient)
            {
                //TODO: need to work out what table number we have hit, guess the projectile will know?
                const TABLE_NUMBER = 0;
                const table = this.restaurantManager.getTableByNumber(TABLE_NUMBER);
                table.addIngredient(ingredient);
                this.belt.setLastTypeHit(null);
            }

        });

        this.spawnIngredient();

    }

    spawnIngredient(){
        const spawnIngredientIntervalMIN = 1300;
        const spawnIngredientIntervalMAX = 1500;

        requestAnimationFrame(() => {
            const newIngredient = this.getNextIngredient(this.app.screen.width / 25, this.app.screen.height / 25);

            newIngredient.sprite.x = this.app.screen.width / 2;
            newIngredient.sprite.y = 0;

            this.belt.addIngredient(newIngredient);

            this.app.stage.addChild(newIngredient.sprite);

            let timeout = Math.floor(Math.random() * spawnIngredientIntervalMAX) + spawnIngredientIntervalMIN;
            setTimeout(() => this.spawnIngredient(), timeout)
        })
    }

    initGun() {
        this.gun = new Gun(this.app.screen.height / 2);
        this.app.stage.addChild(this.gun.sprite);
        this.gun.bullettMagazine.forEach((bullet)=>{
            this.app.stage.addChild(bullet.sprite);
        });

    }

    initController() {

        const arrowUp = 38;
        const arrowDown = 40;
        const backspace = 32;

        var keyMoveGunUp = new Keyboard(arrowUp);
        var keyMoveGunDown = new Keyboard(arrowDown);
        var keyFireGun = new Keyboard(backspace);

        keyMoveGunUp.key.press = (delta) => this.gun.moveYAxis(this.gun.sprite.y - (3 * delta || 1));
        keyMoveGunDown.key.press = (delta) => this.gun.moveYAxis(this.gun.sprite.y + (3 * delta || 1));
        keyFireGun.key.press = (delta) => this.gun.fire(this.gun.sprite.y + (3 * delta || 1));

        this.app.ticker.add(delta => {
            if(keyMoveGunUp.key.isDown){
                keyMoveGunUp.key.press(delta);

            }
            if(keyMoveGunDown.key.isDown){
                keyMoveGunDown.key.press(delta);

            }
        });

    }

    getNextIngredient(width, height) {
        const ingredientType = Recipes.ingredients[Math.floor(Math.random() * Recipes.ingredients.length)];
        return new Ingredient(ingredientType, width, height);
    }

}
