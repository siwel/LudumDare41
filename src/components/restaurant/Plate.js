import BaseSprite from "../BaseSprite";

export default class Plate extends BaseSprite{

    constructor(width, height,location) {

        super('assets/bunny.png', width, height);

        this.sprite.x = location.x-100;
        this.sprite.y = location.y +100;
    }

    //TODO
    updateplate() {

    }




}