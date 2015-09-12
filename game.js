var fps = 24;
var frameTimeMilliseconds = 1000 / fps;

var canvas = document.querySelector('canvas#game');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

var height = Math.round(canvas.height / 60);
var width = Math.round(canvas.height / 60);

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

window.onkeydown = function(e) {
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

var position = {
    x: 10 * width,
    y: 4 * height
};

var food = {
    position: {
        x: 20 * width,
        y: 20 * height
    }
};

var points = 0;

// game loop
setInterval(function() {
    // clear the entire canvas on each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (direction) {
        case directions.up: position.y -= height; break;
        case directions.left: position.x -= width; break;
        case directions.down: position.y += height; break;
        case directions.right: position.x += width; break;
    }

    if (position.x === food.position.x && position.y === food.position.y) {
        points++;

        food.position = {
            x: Math.round(Math.random() * 60) * width,
            y: Math.round(Math.random() * 60) * height
        };
    }

    ctx.beginPath();
    drawSnake();
    drawFood();
    drawPoints();
    ctx.stroke();
}, frameTimeMilliseconds);

function drawSnake() {
    ctx.rect(position.x, position.y, height, width);
}

function drawFood() {
    ctx.fillRect(food.position.x, food.position.y, height, width);
}

function drawPoints() {
    ctx.font = '12px serif';
    ctx.fillText('Points: ' + points, 10, 20);
}

