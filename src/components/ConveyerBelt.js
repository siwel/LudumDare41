import BaseSprite from './BaseSprite';

export default class ConveyerBelt extends BaseSprite {
    constructor(width, height) {
        super('assets/background/belt.png', width, height, true);

        this.sprite.tileScale.set(0.5);


        this.ingredients = [];
        this.hitBuffer = 0;

        this.position = 0;

        this.runAnimation = false

    }

    animate(){
        const BELT_SPEED = 1.5;
        requestAnimationFrame(() => {
            this.animate();


            this.position+= BELT_SPEED;
            this.sprite.tilePosition.set(0, this.position);

            this.ingredients.forEach((ingredient, index, arr) => {
                ingredient.y+= BELT_SPEED;

                // ingredient.scale.x++;
                if (ingredient.y >= this.height + ConveyerBelt.BUFFER) {
                    ingredient.destroy();
                    arr.shift();
                }
            });

        })
    }

    setIngredientHeight(height) {
        this.hitBuffer = height / 2;
    }

    addIngredient(ingredient) {
        ingredient.y = -ConveyerBelt.BUFFER;
        this.ingredients.push(ingredient);
    }

    getIngredient() {
        return this.ingredients;
    }


    registerHit(y) {
        for (let i = 0; i < this.ingredients.length; i++) {
            const yDiff = this.ingredients[i].y - y;
            if (Math.abs(yDiff) < this.hitBuffer) {
                this.setLastTypeHit(this.ingredients[i].type);
                this.runAnimation =true;
                this.animateIngredient(this.ingredients[i]["pixiSprite"], y,i );

                break;
            }
        }
    }

    animateIngredient(ingredient , y, index) {

        if(!this.runAnimation) return;

         requestAnimationFrame(()=>{
              if(!this.runAnimation) return;
            if( ingredient.x < window.innerWidth-10) {
                ingredient.x +=2;
                ingredient.y = y;

                this.animateIngredient(ingredient ,y, index)
            }else {
                    this.ingredients[index].destroy();
                    this.ingredients.splice(index, 1);
                    this.runAnimation = false;
            }
        });


    }

    setLastTypeHit(type) {
        this._lastHit = type;
    }

    clearLastHit() {
        this._lastHit = null;
    }

    get lastHit() {
        return this._lastHit;
    }

    /**
     * The space above and below the belt to spawn/despawn
     * @returns {number}
     * @constructor
     */
    static get BUFFER(){
        return 50;
    }
}