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

    destroy() {
        this.sprite.destroy();
    }

    static get images() {
        return {
            'onion': 'assets/bunny.png',
            'tomato': 'assets/bunny.png',
            'carrot': 'assets/bunny.png',
            'celery': 'assets/bunny.png',
        }
    }
}