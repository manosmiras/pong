import './style.css'
import * as PIXI from 'pixi.js';
const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
});

document.body.appendChild(app.view);

const ball = createBall();
const playerPaddle = createPaddle(0);
const aiPaddle = createPaddle(app.screen.width);

// add to stage
app.stage.addChild(ball);
app.stage.addChild(playerPaddle);
app.stage.addChild(aiPaddle);
ball.vx = 5;

app.ticker.add(() => {
    if(ball.x >= app.screen.width){
        ball.vx = -5;
    } else if (ball.x <= 0){
        ball.vx = 5;
    }
    ball.x += ball.vx;
});

function createBall(){
    // create a new Sprite from an image path
    const ball = PIXI.Sprite.from('https://pixijs.com/assets/star.png');
    // center the sprite's anchor point
    ball.anchor.set(0.5);
    // move the sprite to the center of the screen
    ball.x = app.screen.width / 2;
    ball.y = app.screen.height / 2;
    ball.scale.x = 0.1;
    ball.scale.y = 0.1;
    return ball;
}

function createPaddle(x){
    // create a sprite
    const paddle = PIXI.Sprite.from('https://pixijs.com/assets/star.png');
    // center the sprite's anchor point
    paddle.anchor.set(0.5);
    // set position
    paddle.x = x;
    paddle.y = app.screen.height / 2;
    // set scale
    paddle.scale.x = 0.1;
    paddle.scale.y = 1;

    return paddle;
}