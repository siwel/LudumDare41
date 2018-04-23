import BaseSprite from './BaseSprite';

// TODO implement
export default class HealthBar extends BaseSprite {
    constructor(image,width, height) {
        super(image, width, height);
        this.HEALTH = HealthBar.MAX_HEALTH;
        this.sprite.scale.x = 1;
    }

    tickHealthDown() {

        if (this.HEALTH >= 0){
            this.HEALTH -= 1;
            this.sprite.scale.x = this.HEALTH/HealthBar.MAX_HEALTH;
        }

    }

    addHealth() {

        if (this.HEALTH <= HealthBar.MAX_HEALTH) {
            this.HEALTH += 10;
            this.sprite.scale.x = this.HEALTH/HealthBar.MAX_HEALTH;
            console.log("ADD Health ", this.HEALTH);
        }
    }

    isZeroHealth() {

        return this.HEALTH <= 0;
    }

    static get MAX_HEALTH() {
        return 5000;
    }

}