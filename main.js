import * as PIXI from 'pixi.js';
import Ball from './game/ball.js';
import Paddle from './game/paddle.js';
import Input from './game/input.js';
import './style.css';

const app = new PIXI.Application({
    background: '#000000',
    resizeTo: window,
});

document.body.appendChild(app.view);

const padding = 20;
// Create entities
let ball = new Ball(app.screen.width / 2, app.screen.height / 2);
let playerPaddle = new Paddle(padding, app.screen.height / 2);
let aiPaddle = new Paddle(app.screen.width - padding, app.screen.height / 2);
let playerScore = createText(0, app.screen.width / 3, app.screen.height / 6, 72);
let aiScore = createText(0, app.screen.width - app.screen.width / 3, app.screen.height / 6, 72);
// Add to stage
app.stage.addChild(aiScore);
app.stage.addChild(playerScore);
app.stage.addChild(ball);
app.stage.addChild(playerPaddle);
app.stage.addChild(aiPaddle);

ball.reset(app.screen.width / 2, app.screen.height / 2);
let entities = [ball, playerPaddle, aiPaddle];

const input = new Input();
input.handlePlayerMovement(playerPaddle);

let elapsedTime = 0;
let speed = 5;
app.ticker.add((delta) => {
    elapsedTime += delta / 60;

    // Change ai speed to a random number every 1 second
    if(elapsedTime % 1 < 0.01){
        speed = 1 + Math.random() * 4;
    }

    // Move ai paddle
    if(aiPaddle.y > ball.y){
        aiPaddle.vy = -speed;
    } else if (aiPaddle.y < ball.y){
        aiPaddle.vy = speed;
    }

    // Ball bounce
    if(ball.y >= app.screen.height || ball.y <= 0){
        ball.vy = -ball.vy;
    }

    // Check paddle hits
    if (ball.hasHitPaddle(playerPaddle)) {
        ball.vx = -ball.vx;
    }
    if (ball.hasHitPaddle(aiPaddle)) {
        ball.vx = -ball.vx;
    }

    // Check player has scored
    if (hasPlayerScored(ball, app.screen.width)) {
        handlePlayerScored();
    } else if (hasAIScored(ball, 0)) {
        handleAIScored();
    }

    // Move entities
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
    ball.reset(app.screen.width / 2, app.screen.height / 2);
    playerScore.text++;
}

function handleAIScored() {
    ball.reset(app.screen.width / 2, app.screen.height / 2);
    aiScore.text++
}

function createText(content, x, y, fontSize) {
    const text = new PIXI.Text(content, { fontFamily: 'Arial', fontSize: fontSize, fill: 0xffffff });
    text.x = x - fontSize + fontSize / 2;
    text.y = y - fontSize / 2;
    return text;
}