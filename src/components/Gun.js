import BaseSprite from './BaseSprite';

export default class Gun extends BaseSprite{

  constructor(positionY) {
        super('assets/bunny.png', 50, 50);

        this.sprite.x = 10;
        this.sprite.y = positionY;

        this.sprite.rotation = Math.PI * 2 * 0.25;

        // Opt-in to interactivity
        this.sprite.interactive = true;

        // Shows hand cursor
        this.sprite.buttonMode = true;

        // setup events for mouse + touch using
        // the pointer events
        this.sprite
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);
    }

    onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.alpha = 0.5;
        this.dragging = true;
    }

    onDragEnd() {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    onDragMove() {
        if (this.dragging) {
            var newPosition = this.data.getLocalPosition(this.parent);
            this.y = newPosition.y;
        }
    }

    moveYAxis(newPosition) {
       if (newPosition > 30 && newPosition < window.innerHeight-30) {
           this.sprite.y = newPosition;
       }

    }
}