var snakeGame = {

    canvas: document.getElementById('canvas'),
    lastUpdateTime: 0,

    update: function(tFrame) {
        this.moveSnakePieces();

        switch (this.dir) {
            case "Up":
                this.snake[0].y -= this.snake[0].height;
                if(this.snake[0].y < 0) {
                    this.initialize();
                }
            break;

            case "Down":
                this.snake[0].y += this.snake[0].height;
                if(this.snake[0].y > this.ctx.canvas.height - this.snake[0].height) {
                    this.initialize();
                }
            break;

            case "Left":
                this.snake[0].x -= this.snake[0].width;
                if(this.snake[0].x < 0) {
                    this.initialize();
                }
            break;

            case "Right":
                this.snake[0].x += this.snake[0].width;
                if(this.snake[0].x > this.ctx.canvas.width - this.snake[0].width) {
                    this.initialize();
                }
            break;
        }

        for (var i = 1; i < this.snake.length; i++) {
            if (this.isCollision(this.snake[0], this.snake[i])) {
                this.initialize();
            }
        }

        if (this.isCollision(this.snake[0], this.foodRect)) {
            this.foodRect = this.getFoodRect();
            score = getRndInteger(1, 5);
            for (var i = 0; i < score; i++) {
                this.snake[this.snake.length] = {x: this.snake[this.snake.length-1].x, y: this.snake[this.snake.length-1].y, width: this.snakeWidth, height: this.snakeHeight};
            }
            this.score += score;
        }

        if(this.snake.length >= 10) {
            this.rate = 38;
        }
        if(this.snake.length >= 20) {
            this.rate = 35;
        }
        if(this.snake.length >= 40) {
            this.rate = 30;
        }
        if(this.snake.length > 60) {
            this.rate = 20;
        }

    },

    render: function() {
        this.drawBoard();
        this.drawSnake();
        this.drawFood();
        this.drawScore();
        this.drawPos();
    },

    initialize: function() {
        this.dir = "Down";
        this.pause = true;
        this.rate = 40;
        this.score = 0;

        this.ctx = canvas.getContext('2d');
        this.ctx.canvas.width  = Math.floor(window.innerWidth - 100);
        this.ctx.canvas.height = Math.floor(window.innerHeight - 100);
        startingX = Math.floor(this.ctx.canvas.width / 2);
        startingY = Math.floor(this.ctx.canvas.height / 2);
        this.snakeWidth = Math.floor(.01 * this.ctx.canvas.width);
        this.snakeHeight = this.snakeWidth;
        this.foodRect = this.getFoodRect();
        this.snake = [this.getSnakeRect(startingX, startingY)];
    },

    drawBoard: function() {
        this.ctx.fillStyle = 'black';
        this.ctx.canvas.width  = Math.floor(window.innerWidth - 100);
        this.ctx.canvas.height = Math.floor(window.innerHeight - 100);
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    },

    drawSnake: function() {
        this.ctx.fillStyle = 'white';
        for (var i = 0; i < this.snake.length; i++) {
            this.ctx.fillRect(this.snake[i].x, this.snake[i].y, this.snake[i].width, this.snake[i].height);
        }
    },

    drawFood: function() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.foodRect.x, this.foodRect.y, this.foodRect.width, this.foodRect.height);
    },

    drawScore: function() {
        this.ctx.fillStyle = 'green';
        this.ctx.globalAlpha = 0.8;
        this.ctx.font = '50px serif';
        this.ctx.fillText(this.score, 50, 50);
        this.ctx.globalAlpha = 0.0;
    },

    drawPos: function() {
        this.ctx.fillStyle = 'green';
        this.ctx.globalAlpha = 0.8;
        this.ctx.font = '50px serif';
        this.ctx.fillText(this.snake[0].x + ', ' + this.snake[0].y, 50, 200);
        this.ctx.globalAlpha = 0.0;
    },

    getSnakeRect: function(x, y) {
        return {x: x - (this.snakeWidth / 2), y: y - (this.snakeHeight / 2), width: this.snakeWidth, height: this.snakeHeight};
    },

    getFoodRect: function() {
        return {
            x: getRndInteger(0, this.ctx.canvas.width - this.snakeWidth),
            y: getRndInteger(0, this.ctx.canvas.height - this.snakeHeight),
            width: Math.floor(.01 * this.ctx.canvas.width),
            height: Math.floor(.01 * this.ctx.canvas.width),
        };
    },

    isCollision: function(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        )
    },

    moveSnakePieces: function() {
        for (var i = this.snake.length - 1; i > 0; i--) {
            this.snake[i].x = this.snake[i-1].x;
            this.snake[i].y = this.snake[i-1].y;
        }
    }

};


/*
* Starting with the semicolon is in case whatever line of code above this example
* relied on automatic semicolon insertion (ASI). The browser could accidentally
* think this whole example continues from the previous line. The leading semicolon
* marks the beginning of our new line if the previous one was not empty or terminated.
*
* Let us also assume that MyGame is previously defined.
*/
;(function () {
    function main( tFrame ) {
        snakeGame.stopMain = window.requestAnimationFrame( main );

        if(snakeGame.pause) {
            snakeGame.drawBoard();
            snakeGame.drawSnake();
            snakeGame.drawFood();
            snakeGame.ctx.fillStyle = 'blue';
            snakeGame.ctx.globalAlpha = 0.6;
            snakeGame.ctx.font = '50px serif';
            snakeGame.ctx.fillText('Press space to pause/unpause.', Math.floor(snakeGame.ctx.canvas.width / 2) - 500, Math.floor(snakeGame.ctx.canvas.height / 2));
            snakeGame.ctx.globalAlpha = 0.0;
            snakeGame.drawScore();
        }
        
        else if(tFrame - snakeGame.lastUpdateTime > snakeGame.rate) {
            snakeGame.lastUpdateTime = tFrame;
            snakeGame.update( tFrame ); // Call your update method. In our case, we give it rAF's timestamp.
            snakeGame.render();
        }
    }
    
    snakeGame.initialize();
    main(); // Start the cycle
})();


window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "Down": // IE/Edge specific value
        case "ArrowDown":
            if(snakeGame.dir != "Up")
                snakeGame.dir = "Down";
        break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
            if(snakeGame.dir != "Down")
                snakeGame.dir = "Up";
        break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
            if(snakeGame.dir != "Right")
                snakeGame.dir = "Left";
        break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
            if(snakeGame.dir != "Left")
                snakeGame.dir = "Right";
        break;
        case "Enter":
        // Do something for "enter" or "return" key press.
        break;
        case "Esc": // IE/Edge specific value
        case "Escape":
        case "Spacebar":
        case " ":
            snakeGame.pause = !snakeGame.pause;
        break;
        default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }