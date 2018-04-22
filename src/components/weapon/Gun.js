import BaseSprite from '../BaseSprite';
import Bullet from './Bullet';
import {Howl} from 'howler';

export default class Gun extends BaseSprite{

  constructor(positionY) {
        super('assets/bunny.png', 50, 50);

        this.sprite.x = 10;
        this.sprite.y = positionY;

        this.MAX_BULLET = 10;

        this.firedBullet = 0;

        this.bullettMagazine = [];

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

        this.addBullet();


      this.fireSound = new Howl({
          src: ['assets/sounds/fire.mp3']
      });

    }

    addBullet() {

      for(var index = 0; index < this.MAX_BULLET ; index++) {
          this.bullettMagazine.push(new Bullet())
      }
    }

    fire (yAxis) {

      if(this.firedBullet < this.MAX_BULLET) {
          this.bullettMagazine[this.firedBullet].moveBullet(yAxis ,this.firedBullet);
          this.fireSound.play();
          this.firedBullet++;

      }else {
          this.firedBullet = 0;
      }
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
       const height = window.document.getElementById('game').offsetHeight;
       if (newPosition > 30 && newPosition < height-30) {
           this.sprite.y = newPosition;
       }
    }
}