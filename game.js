var fps = 24;
var frameTimeMilliseconds = 1000 / fps;

var canvas = document.querySelector('canvas#game');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var board = {
    width: 60,
    height: 35
};

var width = Math.round(canvas.width / board.width);
var height = Math.round(canvas.height / board.height);

var ctx = canvas.getContext('2d');

var keys = {
    up: 87,
    left: 65,
    down: 83,
    right: 68
};

var directions = {
    up: 0,
    left: 1,
    down: 2,
    right: 3
};

var direction = directions.right;

window.onkeydown = function (e) {
    var key = e.keyCode;

    switch (key) {
        case keys.up:
            if (direction !== directions.down) {
                direction = directions.up;
            }
            break;
        case keys.left:
            if (direction !== directions.right) {
                direction = directions.left;
            }
            break;
        case keys.down:
            if (direction !== directions.up) {
                direction = directions.down;
            }
            break;
        case keys.right:
            if (direction !== directions.left) {
                direction = directions.right;
            }
            break;
    }
};

var snake = {
    position: {
        x: 10,
        y: 4
    }
};

var food = {
    position: {
        x: 20,
        y: 20
    }
};

var points = 0;

// game loop
setInterval(function () {
    // clear the entire canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (direction) {
        case directions.up:
            snake.position.y--;
            break;
        case directions.left:
            snake.position.x--;
            break;
        case directions.down:
            snake.position.y++;
            break;
        case directions.right:
            snake.position.x++;
            break;
    }

    if (snake.position.x === food.position.x && snake.position.y === food.position.y) {
        points++;

        food.position = {
            x: Math.round(Math.random() * board.width),
            y: Math.round(Math.random() * board.height)
        };
    }

    if (collisionWithEdge()) {
        restart();
    }

    ctx.beginPath();
    drawSnake();
    drawFood();
    drawPoints();
    ctx.stroke();
}, frameTimeMilliseconds);

function drawSnake() {
    ctx.rect(snake.position.x * width, snake.position.y * width, height, height);
}

function drawFood() {
    ctx.fillRect(food.position.x * width, food.position.y * width, height, height);
}

function drawPoints() {
    ctx.font = '30px serif';
    ctx.fillText('Points: ' + points, 10, 40);
}

function collisionWithEdge() {
    if (snake.position.x > board.width) {
        return true;
    }
    else if (snake.position.x < 0) {
        return true;
    }
    else if (snake.position.y < 0) {
        return true;
    }
    else if (snake.position.y > board.height) {
        return true;
    }
    else {
        return false;
    }
}

function restart() {
    snake.position.x = 10;
    snake.position.y = 4;
    food.position.x = 20;
    food.position.y = 20;
    points = 0;
    direction = directions.right
}
