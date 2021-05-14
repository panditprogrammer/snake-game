let game = document.getElementById("game");
let score_h1 = document.getElementById("scoreh1");
let game_over = document.querySelector(".game_over");
let direction = { x: 0, y: 0 };
let lastPrintTime = 0;
let speed = 2;
let snake_arr = [{ x: 13, y: 15 }];
let snake_part, food_part, score = 0;
let high_score;
let food = { x: 12, y: 8 };

// game sounds 
let eat_sound = new Audio("assets/eat.wav");
let high_score_sound = new Audio("assets/high_score.wav");
let game_over_sound = new Audio("assets/game_over.wav");


// start display 
game_over.innerHTML = ` <strong>Press Arrow key to Play</strong>`;


// game function 
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPrintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPrintTime = ctime;
    gameEngine();
    // console.log(ctime);

}

// collision detection
function isCollide(snake) {
    // if snake collide with its body 
    for (let i = 1; i < snake_arr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    // checking wall collision 
    if (snake[0].x > 20 || snake[0].x < 0 || snake[0].y > 20 || snake[0].y < 0) {
        return true;
    }

}

function gameEngine() {

    // if game over after collision 
    if (isCollide(snake_arr)) {
        game_over_sound.play();
        direction = { x: 0, y: 0 };
        game_over.style.display = "block";
        game_over.innerHTML = `  <h3>Game Over! </h3>
        <strong>Press Arrow key to play Again</strong>`;
        score = 0;
        snake_arr = [{ x: 13, y: 15 }];
        score_h1.innerText = `Score  ${score}`;


    }

    //    eating food and increment the snake 
    if (snake_arr[0].y === food.y && snake_arr[0].x === food.x) {
        // increment the score 
        score += 10;
        if (score % 200 === 0) {
            speed = speed - 2;
        }

        // console.log(speed);
        eat_sound.play();

        // localStorage set hight score 
        if (score > high_score) {
            high_score = score;
            high_score_sound.play();
            localStorage.setItem("high_score_local", JSON.stringify(high_score));
            scorehigh.innerHTML = `Hight Score ${high_score}`;
        }

        score_h1.innerText = `Score  ${score}`;
        // food generating 
        snake_arr.unshift({ x: snake_arr[0].x + direction.x, y: snake_arr[0].y + direction.y });
        let a = 1, b = 20;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake by one block
    for (let i = snake_arr.length - 2; i >= 0; i--) {
        snake_arr[i + 1] = { ...snake_arr[i] }; //new object of snake
    }
    // increment the head 
    snake_arr[0].x += direction.x;
    snake_arr[0].y += direction.y;



    // console.log("x= ",snake_arr[0].x,"y = ",snake_arr[0].y);

    game.innerHTML = "";

    snake_arr.forEach((element, index) => {

        // display the snake 
        snake_part = document.createElement("div");
        snake_part.style.gridRowStart = element.y;
        snake_part.style.gridColumnStart = element.x;
        // console.log(element.y,element.x);

        // display head 
        if (index === 0) {
            snake_part.classList.add("head");
        }
        else //display body
        {
            snake_part.classList.add("snake");
        }
        game.appendChild(snake_part);

    });

    // display the food 
    food_part = document.createElement("div");
    food_part.style.gridRowStart = food.y;
    food_part.style.gridColumnStart = food.x;
    food_part.classList.add("food");
    // console.log(food.y, food.x);
    game.appendChild(food_part);
}


// high score store in localStorage 
let high_score_local = localStorage.getItem("high_score_local");
if (high_score_local === null) {
    high_score = 0;
    localStorage.setItem("high_score_local", JSON.stringify(high_score));
}
else {
    // high_score from localStorage 
    high_score = JSON.parse(high_score_local);
    scorehigh.innerText = `High score  ${high_score_local}`;
}

// main game logic 
window.requestAnimationFrame(main);

// keygame events handling 
window.addEventListener("keydown", e => {

    // game_over dialog hide 
    game_over.style.display = "none";

    // change speed using user Selection 
    let user_speed = document.getElementById('speed_user');
    speed = parseInt(user_speed.value);
    // console.log("value is ", speed);


    direction = { x: 0, y: 1 } //start the game

    // changing the snake direction
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;

            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;

            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;

        default:
            break;
    }

});

// for right array key for smartphone 
window.addEventListener("click", () => {

    // game_over dialog hide 
    game_over.style.display = "none";
    // change speed using user Selection 
    let user_speed = document.getElementById('speed_user');
    speed = parseInt(user_speed.value);
    // console.log("value is ", speed);

    right.addEventListener('click', () => {
        direction.x = 1;
        direction.y = 0;
    });

    left.addEventListener('click', () => {
        direction.x = -1;
        direction.y = 0;
    });

    up.addEventListener('click', () => {
        direction.x = 0;
        direction.y = -1;
    });

    down.addEventListener('click', () => {
        direction.x = 0;
        direction.y = 1;
    });

});