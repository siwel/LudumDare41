import BaseSprite from './BaseSprite';

export default class Ingredient extends BaseSprite {
    constructor(type, width, height) {
        const image = Ingredient.images[type] || Ingredient.images['onion'];

        super(image, width, height);
        this.type = type;
    }

    get y() {
        return this.sprite.y;
    }

    set y(value) {
        this.sprite.y = value;
    }

    get x() {
        return this.sprite.x;
    }

    set x(value) {
        this.sprite.x = value;
    }

    destroy() {
        this.sprite.destroy();
    }

    static get images() {
        return {
            'banana': 'assets/ingredients/banana.png',
            'fish': 'assets/ingredients/fish.png',
            'milk': 'assets/ingredients/milk.png',
            'onion': 'assets/bunny.png',
        }
    }
}