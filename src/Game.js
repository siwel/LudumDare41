import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';
import Ingredient from './components/Ingredient';
import Gun from './components/weapon/Gun';
import IngredientCardData from "./components/ingredientcard/IngredientCardData";
import RestaurantManager from "./components/restaurant/RestaurantManager";
import Recipes from "./Recipes";
import Keyboard from './components/Keyboard';
import HealthBar from './components/HealthBar';
import BaseSprite from "./components/BaseSprite";

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
        this.ingredientsOnBelt = [];
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
        this.initBg();
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
        this.belt = new ConveyerBelt(72, this.app.screen.height);
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
            const ingredientSize = 60;
            const newIngredient = this.getNextIngredient(ingredientSize, ingredientSize);

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

        this.simpleBulletHitCheck()

    }

    simpleBulletHitCheck() {
        requestAnimationFrame(() => {

            this.gun.bullettMagazine.forEach((bullet)=>{

                if(bullet.isBulletMoving()){
                    this.belt.getIngredient().forEach((itemOnBelt)=>{
                        var maxX = itemOnBelt.x+30;
                        var minX = itemOnBelt.x-30;
                        var maxY = itemOnBelt.y+30;
                        var minY = itemOnBelt.y-30;

                        if(bullet.getX()<maxX && bullet.getX() > minX
                         && bullet.getY() < maxY && bullet.getY()> minY){
                            console.log("we have a bit", itemOnBelt)
                            this.hitDetected(bullet.getY())
                        }
                    });
                }
            });

            this.simpleBulletHitCheck()
        });

    }

    hitDetected(y){

        this.belt.registerHit(y);
        const ingredient = this.belt.lastHit;
        if(ingredient)
        {

            this.belt.setLastTypeHit(null);
            this.restaurantManager.getAllTables().forEach((table)=>{
                var errorMargin = table.location.y *5/100;
                var maxY = table.location.y + errorMargin;
                var minY = table.location.y - errorMargin;

                if(y>minY && y<maxY){
                    table.addIngredient(ingredient);
                    console.log(table.location)
                }

            })

        }
    }

    initBg(){
        const background = new BaseSprite('assets/background/background.png',this.app.screen.width, this.app.screen.height );
        background.sprite.anchor.set(0);
        this.app.stage.addChild(background.sprite);
    }

    initController() {

        const arrowUp = 38;
        const arrowDown = 40;
        const backspace = 32;

        var keyMoveGunUp = new Keyboard(arrowUp);
        var keyMoveGunDown = new Keyboard(arrowDown);
        var keyFireGun = new Keyboard(backspace);

        const GUN_MOVEMENT_SPEED = 5;
        keyMoveGunUp.key.press = (delta) => this.gun.moveYAxis(this.gun.sprite.y - (GUN_MOVEMENT_SPEED * delta || 1));
        keyMoveGunDown.key.press = (delta) => this.gun.moveYAxis(this.gun.sprite.y + (GUN_MOVEMENT_SPEED * delta || 1));
        keyFireGun.key.press = () => this.gun.fire(this.gun.sprite.y);

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
