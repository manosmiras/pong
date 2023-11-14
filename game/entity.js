import * as PIXI from 'pixi.js';
class Entity extends PIXI.Sprite {
  constructor(texture) {
    super(texture);
    this.vx = 0;
    this.vy = 0;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

export default Entity;