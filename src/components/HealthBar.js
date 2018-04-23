import BaseSprite from './BaseSprite';

// TODO implement
export default class HealthBar extends BaseSprite {
    constructor(width, height) {
        super('assets/background/barbg.png', width, height);
        this.HEALTH = 1;
    }

    removeHealth() {

        if (this.HEALTH >= 0){
            this.HEALTH -= 0.1;
            this.sprite.scale.x = this.HEALTH;
            console.log("REMOVE Health:", this.HEALTH);
        }

    }

    addHealth() {

        if (this.HEALTH <= 1) {
            this.HEALTH += 0.1;
            this.sprite.scale.x = this.HEALTH;
            console.log("ADD Health ", this.HEALTH);
        }
    }

    isZeroHealth() {

        return this.HEALTH < 0.1;
    }


}