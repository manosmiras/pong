import './style.css'
import * as PIXI from 'pixi.js';
const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
});

class Entity extends PIXI.Sprite{
    move(){
        this.x += this.vx;
        this.y += this.vy;
    }
};

class Ball extends Entity {
    constructor() {
        super(PIXI.Texture.from('square.png'));
        // center the sprite's anchor point
        this.anchor.set(0.5);
        // move the sprite to the center of the screen
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        // set velocity
        this.vx = 0;
        this.vy = 0;
        // set scale
        this.scale.x = 0.1;
        this.scale.y = 0.1;
    }

    reset() {
        this.vx = Math.random() < 0.5 ? Math.floor(Math.random() * 2) - 3 : Math.floor(Math.random() * 2) + 2;
        this.vy = Math.random() < 0.5 ? Math.floor(Math.random() * 2) - 3 : Math.floor(Math.random() * 2) + 2;
        console.log("Setting velocity to: " + ball.vx + " " + ball.vy);
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
    }

    hasHitPaddle(paddle){
        let max = paddle.y + paddle.height / 2;
        let min = paddle.y - paddle.height / 2;
    
        if(this.y > min && this.y < max){
            var dx = paddle.x - this.x;
            if(dx * dx < 50){
                return true;
            }
        }
        return false;
    }
};

class Paddle extends Entity {
    constructor(x) {
        super(PIXI.Texture.from('square.png'));
        // center the sprite's anchor point
        this.anchor.set(0.5);
        // set position
        this.x = x;
        this.y = app.screen.height / 2;
        // set velocity
        this.vx = 0;
        this.vy = 0;
        // set scale
        this.scale.x = 0.1;
        this.scale.y = 1;
    }
};

document.body.appendChild(app.view);

const leftLimit = app.screen.width / 8;
const rightLimit = app.screen.width - app.screen.width / 8;
let ball = new Ball();
let playerPaddle = new Paddle(leftLimit);
let aiPaddle = new Paddle(rightLimit);

let playerScore = createText(0, app.screen.width / 3, app.screen.height / 6, 72);
let aiScore = createText(0, app.screen.width - app.screen.width / 3, app.screen.height / 6, 72);
// add to stage
app.stage.addChild(aiScore);
app.stage.addChild(playerScore);
app.stage.addChild(ball);
app.stage.addChild(playerPaddle);
app.stage.addChild(aiPaddle);

ball.reset();
let entities = [ball, playerPaddle, aiPaddle];

const up = keyboard("ArrowUp"), down = keyboard("ArrowDown");

up.press = () => {
    playerPaddle.vy = -5;
};

up.release = () => {
    if (!down.isDown) {
        playerPaddle.vy = 0;
    }
};

down.press = () => {
    playerPaddle.vy = 5;
};
down.release = () => {
    if (!up.isDown) {
        playerPaddle.vy = 0;
    }
};

const padding = 20;

app.ticker.add(() => {
    if(ball.y > app.screen.height || ball.y < 0){
        ball.vy = -ball.vy;
    }

    if (ball.hasHitPaddle(playerPaddle)) {
        ball.vx = -ball.vx;
    }
    if (ball.hasHitPaddle(aiPaddle)) {
        ball.vx = -ball.vx;
    }
    if (hasPlayerScored(ball, rightLimit + padding)) {
        handlePlayerScored();
    } else if (hasAIScored(ball, leftLimit - padding)) {
        handleAIScored();
    }
    entities.forEach(entity => {
        entity.move();
    });
});

function hasPlayerScored(ball, limit) {
    return ball.x >= limit;
}

function hasAIScored(ball, limit) {
    return ball.x <= limit;
}

function handlePlayerScored() {
    ball.reset();
    playerScore.text++;
}

function handleAIScored() {
    ball.reset();
    aiScore.text++
}

function createText(content, x, y, fontSize) {
    const text = new PIXI.Text(content, { fontFamily: 'Arial', fontSize: fontSize, fill: 0xffffff });
    text.x = x - fontSize + fontSize / 2;
    text.y = y - fontSize / 2;
    return text;
}

function keyboard(value) {
    const key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    // The `downHandler`
    key.downHandler = (event) => {
        if (event.key === key.value) {
            if (key.isUp && key.press) {
                key.press();
            }
            key.isDown = true;
            key.isUp = false;
            event.preventDefault();
        }
    };

    // The `upHandler`
    key.upHandler = (event) => {
        if (event.key === key.value) {
            if (key.isDown && key.release) {
                key.release();
            }
            key.isDown = false;
            key.isUp = true;
            event.preventDefault();
        }
    };

    // Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener("keydown", downListener, false);
    window.addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
        window.removeEventListener("keydown", downListener);
        window.removeEventListener("keyup", upListener);
    };

    return key;
}