import Entity from './entity.js';
import * as PIXI from 'pixi.js';
class Paddle extends Entity {
    constructor(x, y) {
        super(PIXI.Texture.from('square.png'));
        // center the sprite's anchor point
        this.anchor.set(0.5);
        // set position
        this.x = x;
        this.y = y;
        // set velocity
        this.vx = 0;
        this.vy = 0;
        // set scale
        this.scale.x = 0.1;
        this.scale.y = 1.5;
    }
};

export default Paddle;