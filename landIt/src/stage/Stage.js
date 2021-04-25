import { map1, mapData } from '../maps/Leia/map1/map1';
import Player from '../player/Player';
import { drawSprite } from '../utils/utils';

class Stage {
  constructor() {
    this.canvas = document.getElementById('game-stage');
    this.ctx = this.canvas.getContext('2d');
    this.stageHeight = 768;
    this.stageWidth = 1024;


    this.fps = 20;
    this.fpsInterval = 0;
    this.startTime = 0;
    this.now = 0;
    this.then = 0;
    this.elapsed = 0;


    this.draw = this.draw.bind(this);
    this.startAnimating = this.startAnimating.bind(this);
    this.draw = this.draw.bind(this);
    this.loadAssets = this.loadAssets.bind(this);

    this.playerInstance = new Player({ width: this.stageWidth, height: this.stageHeight });
    this.assets = {};

    this.startAnimating();
  }

  // initialize the timer variables and start the animation
  startAnimating() {
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;

    // Load assets
    this.loadAssets();

    this.draw();
  }

  // the animation loop calculates time elapsed since the last loop
  // and only draws if your specified fps interval is achieved

  draw() {
    // request another frame
    requestAnimationFrame(this.draw);

    // calc elapsed time since last loop
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    // if enough time has elapsed, draw the next frame
    if (this.elapsed > this.fpsInterval) {

      // Get ready for next frame by setting then=now, but also adjust for your
      // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
      this.then = this.now - (this.elapsed % this.fpsInterval);

      // Put your drawing code here
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

      // draw map
      map1.forEach((row, ri) => {
        row.forEach((particle, ci) => {
          let type = mapData.layout[particle];
          let subType = undefined;
          if (type.indexOf('_') !== -1) {
            type = type.split('_')[0];
            subType = mapData.layout[particle].split('_')[1];
          }
          if(type === "trees") {
            drawSprite(this.ctx, this.assets['grass'], 0, 0, mapData.imgWidth, mapData.imgHeight, ci * 32, ri * 48, 32, 48);
          }
          this.assets[type] && drawSprite(this.ctx, this.assets[type], subType ? mapData[type][subType].x : 0, subType ? mapData[type][subType].y : 0, mapData.imgWidth, mapData.imgHeight, ci * 32, ri * 48, 32, 48);
        });
      });

      // character
      this.playerInstance.draw(this.ctx);
    }
  }


  loadAssets() {
    map1.forEach((row, ri) => {
      row.forEach((particle, ci) => {
        let type = mapData.layout[particle];
        if (type.indexOf('_') !== -1) {
          type = type.split('_')[0];
        }
        if (mapData[type]) {
          const sprite = new Image();
          sprite.src = mapData[type].src;
          this.assets[type] = sprite;
        }
      });
    });
  }
}

export default Stage;