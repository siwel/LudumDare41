import BaseSprite from '../BaseSprite';
import Bullet from './Bullet';
import {Howl} from 'howler';
import * as PIXI from "pixi.js";

export default class Gun{

  constructor(positionY) {


      var frames = [];
      for (var i = 0; i < 22; i++) {
          var val = i < 10 ? '0' + i : i;

          // magically works since the spritesheet was loaded with the pixi loader
          frames.push(PIXI.Texture.fromFrame('chefwalkcycle'+val+'.png'));
      }


      this._sprite = new PIXI.extras.AnimatedSprite(frames);

      this._sprite.anchor.set(0.5)
      this._sprite.scale.x = -1;


      this.moveTimer = 0;
      // this._sprite.x = 100;
      // this._sprite.y = 100;


        this._sprite.x = 50;
        this._sprite.y = positionY;

        this.MAX_BULLET = 10;

        this.firedBullet = 0;

        this.bullettMagazine = [];

        // this._sprite.rotation = Math.PI * 2 * 0.25;

        // Opt-in to interactivity
        this._sprite.interactive = true;

        // Shows hand cursor
        this._sprite.buttonMode = true;

        // setup events for mouse + touch using
        // the pointer events
        this._sprite
            .on('pointerdown', this.onDragStart)
            .on('pointerup', this.onDragEnd)
            .on('pointerupoutside', this.onDragEnd)
            .on('pointermove', this.onDragMove);

        this.addBullet();


      this.fireSound = new Howl({
          src: ['assets/sounds/blurp.flac']
      });


    }

    get sprite() {
        return this._sprite;
    }

    addBullet() {

      for(var index = 0; index < this.MAX_BULLET ; index++) {
          this.bullettMagazine.push(new Bullet())
      }
    }

    fire (yAxis) {

      if(this.firedBullet < this.MAX_BULLET) {
          const bullet = this.bullettMagazine[this.firedBullet];
          bullet.setStartingX();
          bullet.moveBullet(yAxis , this.firedBullet);
          this.fireSound.play();
          this.firedBullet++;

      }else {
          setTimeout(()=>{
              this.firedBullet = 0;
          }, 3000);

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

    playLoop(){
      requestAnimationFrame(() => {
          this.moveTimer++;

          const FRAMES_TO_WAIT_BEFORE_STOPPING_ANIMATION = 5;
          if(this.moveTimer > FRAMES_TO_WAIT_BEFORE_STOPPING_ANIMATION){
              this._sprite.stop();
              this.moveTimer = 0;
          }
          else
          {
              this.playLoop()
          }
      })
    }

    moveYAxis(newPosition) {

      if(this.moveTimer === 0){
         this.playLoop();
      }

        this.moveTimer = 0;
        this._sprite.play();

        const height = window.document.getElementById('game').offsetHeight;
       if (newPosition > 30 && newPosition < height-30) {
           this._sprite.y = newPosition;
       }
    }
}