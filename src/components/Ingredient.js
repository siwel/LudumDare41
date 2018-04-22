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
    
    static get images() {
        return {
            'banana': 'assets/ingredients/banana.png',
            'bread': 'assets/ingredients/bread.png',
            'chicken': 'assets/ingredients/chicken.png',
            'chocolate': 'assets/ingredients/chocolate.png',
            'egg': 'assets/ingredients/egg.png',
            'eye': 'assets/ingredients/eye.png',
            'fish': 'assets/ingredients/fish.png',
            'milk': 'assets/ingredients/milk.png',
            'porridge': 'assets/ingredients/porridge.png',
            'rice': 'assets/ingredients/rice.png',
            'sauce': 'assets/ingredients/sauce.png',
            'spider': 'assets/ingredients/spider.png',
            'sugar': 'assets/ingredients/sugar.png',
            'Banana Hotdog': 'assets/ingredients/bananaHotdog.png',
            'Chicken Cotton Candy': 'assets/ingredients/chickenCottonCandy.png',
            'Chocolate Risotto': 'assets/ingredients/chocolateRisotto.png',
            'Cow eyes porridge': 'assets/ingredients/cowEyePorridge.png',
            'Fish  Milkshake': 'assets/ingredients/fishMilkshake.png',
            'Spider Sponge Cake': 'assets/ingredients/spiderCake.png',
        }
    }
}