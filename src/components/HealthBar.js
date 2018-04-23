import BaseSprite from './BaseSprite';

// TODO implement
export default class HealthBar extends BaseSprite {
    constructor(width, height) {
        super('assets/background/barbg.png', width, height);
        this.HEALTH = 100;
        this.div = 100;
    }

    removeHealth() {

        if (this.HEALTH >= 0){
            this.HEALTH -= 10;
            this.sprite.scale.x = this.HEALTH/100;
            console.log("REMOVE Health:", this.HEALTH);
        }

    }

    addHealth() {

        if (this.HEALTH <= 100) {
            this.HEALTH += 10;
            this.sprite.scale.x = this.HEALTH/100;
            console.log("ADD Health ", this.HEALTH);
        }
    }

    isZeroHealth() {

        return this.HEALTH <= 0;
    }


}