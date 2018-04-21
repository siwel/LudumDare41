import BaseSprite from './BaseSprite';

export default class ConveyerBelt extends BaseSprite {
    constructor(width, height) {
        super('assets/bunny.png', width, height);

        this.ingredients = [];
        this.hitBuffer = 0;
    }

    setIngredientHeight(height) {
        this.hitBuffer = height / 2;
    }

    start() {
        setInterval(() => {
            this.ingredients.forEach((ingredient, index, arr) => {
                ingredient.y++;
                if (ingredient.y >= this.height) {
                    ingredient.destroy();
                    arr.shift();
                }
            });
        }, 10);
    }

    addIngredient(sprite) {
        this.ingredients.push(sprite);
    }


    registerHit(y) {
        for (let i = 0; i < this.ingredients.length; i++) {
            const yDiff = this.ingredients[i].y - y;
            if (Math.abs(yDiff) < this.hitBuffer) {
                this.ingredients[i].destroy();
                this.ingredients.splice(i, 1);
                break;
            }
        }
    }
}