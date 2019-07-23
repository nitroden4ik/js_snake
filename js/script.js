const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = "img/bg.jpg";

const food = new Image();
food.src = "img/apple.png";

let box = 65;

let score = 0;

let apple = {
    x: Math.floor((Math.random() * 10)) * box,
    y: Math.floor((Math.random() * 10)) * box,
};

let snake = [];

snake [0] = {
    x: 5 * box,
    y: 5 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event){
    if(event.keyCode == 37 && dir != "right")
     dir = "left";
    else if(event.keyCode == 38 && dir != "down")
     dir = "up";
     else if(event.keyCode == 39 && dir != "left")
     dir = "right";
     else if(event.keyCode == 40 && dir != "up")
     dir = "down";
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, apple.x, apple.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "red" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
}

ctx.fillStyle = "black";
ctx.font = "50px Arial";
ctx.fillText(score, box * 9, box * 2);

let snakeX = snake[0].x;
let snakeY = snake[0].y;

if(snakeX == apple.x && snakeY == apple.y) {
    score++;
    apple = {
        x: Math.floor((Math.random() * 10)) * box,
        y: Math.floor((Math.random() * 10)) * box,
    };
} else {
    snake.pop();
}

if(snakeX < box || snakeX > box * 8
    || snakeY < box || snakeY > box * 8)
    clearInterval(game);

if(dir == "left") snakeX -= box;
if(dir == "right") snakeX += box;
if(dir == "up") snakeY -= box;
if(dir == "down") snakeY += box;

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y)
        clearInterval(game);
    }
}

let newHead = {
    x: snakeX,
    y: snakeY
};

eatTail(newHead, snake);

snake.unshift(newHead);
}

let game = setInterval(drawGame, 150);
