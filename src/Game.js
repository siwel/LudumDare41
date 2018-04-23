import * as PIXI from 'pixi.js';
import ConveyerBelt from './components/ConveyerBelt';
import Ingredient from './components/Ingredient';
import Gun from './components/weapon/Gun';
import RestaurantManager from "./components/restaurant/RestaurantManager";
import Recipes from "./Recipes";
import Keyboard from './components/Keyboard';
import HealthBar from './components/HealthBar';
import BaseSprite from "./components/BaseSprite";
import GameOverScreen from './components/GameOverScreen';
import {Howl} from "howler";

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

    constructor() {
        this.activeIngredients = [];
        this.belt = null;
        this.gun = null;
        this.ingredientsOnBelt = [];

        this.bgsound = new Howl({
            src: ['assets/sounds/main_game_music.mp3'],
            loop: true,
            volume: 0.3,
        });

        this.bgsound.play();

        this.hitSound = new Howl({
            src: ['assets/sounds/hit_pstve.mp3']
        });

        this.loseSound = new Howl({
            src: ['assets/sounds/losing_theme.mp3']
        });




        this.missCountdelay = false;
        this.hitCountDelay = false;


        this.availableIngredients();
    }

    init() {
        const loader = PIXI.loader;
        loader.add('assets/characters/chef/walk/animation.json');
        loader.add('assets/customer_sprite_happy/animation.json');
        loader.add('assets/customer_sprite_unhappy/animation.json');
        loader.add('assets/customer_sprite_idle/animation.json');


        //PRELOAD THE ingredients SO THEY DON'T POP IN ON THE BELT
        loader.add('assets/ingredients/banana.png');
        loader.add('assets/ingredients/bread.png');
        loader.add('assets/ingredients/chicken.png');
        loader.add('assets/ingredients/chocolate.png');
        loader.add('assets/ingredients/egg.png');
        loader.add('assets/ingredients/eye.png');
        loader.add('assets/ingredients/fish.png');
        loader.add('assets/ingredients/milk.png');
        loader.add('assets/ingredients/porridge.png');
        loader.add('assets/ingredients/rice.png');
        loader.add('assets/ingredients/sauce.png');
        loader.add('assets/ingredients/spider.png');
        loader.add('assets/ingredients/sugar.png');
        loader.add('assets/ingredients/bananaHotdog.png');
        loader.add('assets/ingredients/chickenCottonCandy.png');
        loader.add('assets/ingredients/chocolateRisotto.png');
        loader.add('assets/ingredients/cowEyePorridge.png');
        loader.add('assets/ingredients/fishMilkshake.png');
        loader.add('assets/ingredients/spiderCake.png');

        loader.load((loader, resources) => this.onLoad(loader, resources));

    }


    onLoad(loader, resources) {
        const gameEl = document.getElementById('game');
        const style = window.getComputedStyle(gameEl);

        this.app = new PIXI.Application(pxToNum(style.getPropertyValue('width')), pxToNum(style.getPropertyValue('height')), {backgroundColor: 0x1099bb});
        gameEl.appendChild(this.app.view);

        this.initTopBar();
        this.initBg();
        this.initBelt();
        this.initGun();
        this.initController();

        // Initialise singleton
        RestaurantManager.getInstance(this.app);

        // Listen for animate update
        this.app.ticker.add(delta => {
            this.tickHealth();
            this.isGameOver();
        });
    }

    initTopBar() {
        const barEl = document.getElementById('topBar');
        const style = window.getComputedStyle(barEl);

        const barWidth = pxToNum(style.getPropertyValue('width'));
        const barHeight = pxToNum(style.getPropertyValue('height'));
        this.topBar = new PIXI.Application(barWidth, barHeight, {backgroundColor: 0xFFFFFF})
        barEl.appendChild(this.topBar.view);


        const logo = new BaseSprite('assets/background/ingamelogo.png', 160, 62);
        const logoHeight = barHeight *1.2;
        const logoWidth = logoHeight * 2.58;
        logo.sprite.height = barHeight * 1.2;
        logo.sprite.width = logoWidth;
        logo.sprite.y = barHeight / 2;
        logo.sprite.x = -10;
        logo.sprite.anchor.set(0, .5);


        this.healthBarBG = new HealthBar('assets/background/bar.png',barWidth, barHeight);
        this.healthBarBG.sprite.anchor.set(0);
        this.topBar.stage.addChild(this.healthBarBG.sprite);

        const healthOffset = 40;
        const healthWidth = barWidth - logoWidth + healthOffset;
        this.healthBar = new HealthBar('assets/background/barbg.png',healthWidth, barHeight);
        this.healthBar.sprite.anchor.set(0);
        this.healthBar.sprite.x = logoWidth - healthOffset;
        this.topBar.stage.addChild(this.healthBar.sprite);

        this.topBar.ticker.add(delta => {
            this.healthBar.tickHealthDown();
        })

        //ADD THE LOGO LAST SO ITS ON TOP
        this.topBar.stage.addChild(logo.sprite);
    }

    initBelt() {
        this.belt = new ConveyerBelt(72, this.app.screen.height);
        this.belt.sprite.interactive = true;

        this.belt.sprite.x = this.app.screen.width / 2;
        this.belt.sprite.y = this.app.screen.height / 2;

        this.belt.setIngredientHeight(Game.ingredientSize);

        this.app.stage.addChild(this.belt.sprite);

        this.belt.animate();

        // this.belt.sprite.on('mousedown', event => this.hitDetected(event.data.global.y));

        this.spawnIngredient();

    }

    spawnIngredient() {
        const spawnIngredientIntervalMIN = 800;
        const spawnIngredientIntervalMAX = 1000;

        requestAnimationFrame(() => {
            const newIngredient = this.getNextIngredient(Game.ingredientSize, Game.ingredientSize);

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
        this.gun.bullettMagazine.forEach((bullet) => {
            this.app.stage.addChild(bullet.sprite);
        });

        this.app.stage.addChild(this.gun.magazineView.container);
        this.gun.magazineView.init();

        this.simpleBulletHitCheck();

        this.screenTouched = false;


        window.addEventListener('mouseup', ()=>{
            this.gun.fire(this.gun.sprite.y)
        })

        //For touch too
        window.addEventListener('touchend', ()=>{
            this.gun.fire(this.gun.sprite.y)
        })

    }

    simpleBulletHitCheck() {
        requestAnimationFrame(() => {

            this.gun.bullettMagazine.forEach((bullet) => {

                if (bullet.isBulletMoving()) {
                    this.belt.getIngredient().forEach((itemOnBelt) => {

                        const buffer = 35;
                        const maxX = itemOnBelt.x + buffer;
                        const minX = itemOnBelt.x - buffer;

                        let bulletX = bullet.getX();
                        if (bulletX > minX) {
                            if (bullet.getX() < maxX || bullet.hasGonePastBelt === false) {
                                bullet.hasGonePastBelt = true;
                                this.hitDetected(bullet.getY())
                            }
                        }

                    });
                }
            });

            this.simpleBulletHitCheck()
        });

    }

    hitDetected(y) {

        //this.belt.setLastTypeHit(null);
        this.belt.registerHit(y);


        let ingredient = this.belt.lastHit;
        if (ingredient) {
            RestaurantManager.getInstance().getAllTables().forEach((table) => {
                const errorMargin = table.location.y * 33 / 100;
                const maxY = table.location.y + errorMargin;
                const minY = table.location.y - errorMargin;

                if (y > minY && y < maxY) {
                    // Hackrington Stanley
                    const time = window.innerWidth * 0.15;
                    setTimeout(() => {this.hitCount(table, ingredient)}, time);
                }
            })
        } else {
            this.missCount();
        }
    }

    hitCount (table, ingredient ) {
        table.addIngredient(ingredient);
        this.hitSound.play();

        if (this.hitCountDelay === false && this.missCountdelay === false ) {
            this.hitCountDelay = true;
            setInterval(() => {
                this.hitCountDelay = false
            }, 1000)
        }

        this.belt.clearLastHit();
    }

    missCount () {

        if (this.missCountdelay === false && this.hitCountDelay === false) {
            this.missCountdelay = true;
            setInterval(() => {
                this.missCountdelay = false
            }, 1000)
        }
    }

    isGameOver () {
        if(this.healthBar.isZeroHealth()) {

            this.loseSound.play();
            this.bgsound.stop();

            this.belt.kill();
            this.app.ticker.stop();
            this.topBar.ticker.stop();

            const data = RestaurantManager.getInstance().generateReview();

            this.showGameOverScreen(data);
        }
    }


    showGameOverScreen(data) {
        console.log("Game over screen");
        const gameOverScreen = new GameOverScreen(data);
        this.app.stage.addChild(gameOverScreen.sprite);
    }

    initBg() {
        const background = new BaseSprite('assets/background/background.png', this.app.screen.width, this.app.screen.height);
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
            if (keyMoveGunUp.key.isDown) {
                keyMoveGunUp.key.press(delta);

            }
            if (keyMoveGunDown.key.isDown) {
                keyMoveGunDown.key.press(delta);

            }
        });

    }

    getNextIngredient(width, height) {
        if(this.ingredient.length === 0 ){
            this.availableIngredients();
        }
        let index =  Math.floor(Math.random() * this.ingredient.length)
        const ingredientType = this.ingredient.splice(index,1);
        return new Ingredient(ingredientType, width, height);
    }

    tickHealth() {
        if (RestaurantManager.getInstance().hasJustFinishedTable) {
            this.healthBar.addHealth();
            RestaurantManager.getInstance().hasJustFinishedTable = false;
        }
    }

    availableIngredients (){
        this.ingredient = Array.from(Recipes.ingredients)
    }


    static get ingredientSize() {
        return 60;
    }

}