import Entity from './entity.js';
import * as PIXI from 'pixi.js';
class Ball extends Entity {
    constructor(x, y) {
        super(PIXI.Texture.from('square.png'));
        // center the sprite's anchor point
        this.anchor.set(0.5);
        // move the sprite to the center of the screen
        this.x = x;
        this.y = y;
        // set velocity
        this.vx = 0;
        this.vy = 0;
        // set scale
        this.scale.x = 0.1;
        this.scale.y = 0.1;
    }

    reset(x, y) {
        this.vx = Math.random() < 0.5 ? Math.floor(Math.random() * 2) - 3 : Math.floor(Math.random() * 2) + 2;
        this.vy = Math.random() < 0.5 ? Math.floor(Math.random() * 2) - 3 : Math.floor(Math.random() * 2) + 2;
        this.x = x;
        this.y = y;
    }

    hasHitPaddle(paddle){
        let max = paddle.y + paddle.height / 2;
        let min = paddle.y - paddle.height / 2;
    
        if(this.y > min && this.y < max){
            let dx = paddle.x - this.x;
            const distance = dx * dx;
            if (distance <= 1){
                return true;
            }
        }
        return false;
    }
};

export default Ball;