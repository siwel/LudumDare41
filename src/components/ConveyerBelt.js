import BaseSprite from './BaseSprite';

export default class ConveyerBelt extends BaseSprite {
    constructor(width, height) {
        super('assets/bunny.png', width, height);

        this.ingredients = [];
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
}