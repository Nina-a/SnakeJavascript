const canvas = document.getElementById('canvas');
const contexte = canvas.getContext('2d');

// -----------------------------VARIABLES-----------------------------------

// Speed on x
let speedx = 0;
// Speed on y
let speedy = 10;
// apple
let applex = 0;
let appley = 0;
// score
let score = 0;
// Bug direction
let bugDirection = false;
// StopGame
let stopGame = false;
// Serpent de départ
let snake = [{x:140, y:150},{x:130, y:150},{x:120, y:150},{x:110, y:150}];

function animation(){

    if(stopGame === true){
        return}
    else{
    setTimeout(function(){
        bugDirection = false;
        cleanCanvas();
        drawApple();
        moveForwardSnake();

         drawSnake();
        animation();
    },100)
    }
 }

animation();
createApple();

function cleanCanvas(){
    // Canvas's color
    contexte.fillStyle = "white";
    // Stroke's color
    contexte.strokeStyle ="black";
    // Canvas's position
    contexte.fillRect(0,0,canvas.width, canvas.height);
    contexte.strokeRect(0,0,canvas.width, canvas.height);
}

function drawPiecesSnake(piece){
    contexte.fillStyle = "#00fe14"
    contexte.strokeStyle = "black"
    contexte.fillRect(piece.x, piece.y, 10, 10);
    contexte.strokeRect(piece.x, piece.y, 10, 10);
}

function drawSnake(){
    snake.forEach(piece => {
        drawPiecesSnake(piece);
    })
}

function moveForwardSnake() {
    const head = {x: snake[0].x + speedx, y: snake[0].y + speedy}
    snake.unshift(head);

    if (endGame()){
        snake.shift(head);
        restart();
        stopGame = true;
        return;
    }

    const snakeEatsApple = snake[0].x === applex && snake[0].y === appley;
    if (snakeEatsApple){
        score += 10;
        document.getElementById("score").innerHTML = score
        createApple();
    }else{
    snake.pop();
    }
}

drawSnake();

document.addEventListener("keydown", changeDirection)

function changeDirection(event){
    console.log(event);
    if(bugDirection) return;
    bugDirection = true;

    // Constante permettant d'éviter de faire un demi-tour
    const enTrainDeMonter = speedy === -10;    
    const enTrainDeDescendre = speedy === 10;
    const enTrainDAllerADroite = speedx === 10;
    const EnTrainDAllerAGauche = speedx === -10;

    if (event.code === "ArrowUp" && !enTrainDeDescendre){
        speedy = -10;
        speedx = 0;
    }
    else if(event.code === "ArrowDown" && !enTrainDeMonter){
        speedy = 10;
        speedx = 0;
    }
    else if(event.code === "ArrowLeft" && !enTrainDAllerADroite){
        speedy = 0;
        speedx = -10;       
    }
    else if(event.code === "ArrowRight" && !EnTrainDAllerAGauche){
        speedy = 0;
        speedx = 10;        
    }
}
// fonction donnant un nombre entre 0 et 290
function random(){
    return (Math.round((Math.random() * 290 /10 ))*10);
}

function createApple(){
    applex = random();
    appley = random();

    // Creation en dehors du serpent
    snake.forEach(function(piece){
        if(piece.x == applex && piece.y == appley){
            createApple();
        }
    })
}

function drawApple(){
    contexte.fillStyle = "red";
    contexte.strokeStyle = "darkred";

    contexte.beginPath();
    contexte.arc(applex +5 , appley + 5 , 5, 0, 2 * Math.PI);
    contexte.fill();
    contexte.stroke();
}

function endGame(){
    let snakeBody = snake.slice(1);
    let bitten = false;
    let gameOver = false;

    // Au cas où le serpent se morde
    snakeBody.forEach(piece => {
        if(piece.x === snake[0].x && piece.y === snake[0].y){
            bitten = true;
        }
    })

    // Au cas où le serpent touche un mur
    const touchWallLeft = snake[0].x < -1;
    const toucheWallRight = snake[0].x > canvas.width - 10;
    const touchWallTop = snake[0].y < -1;
    const toucheWallBottom = snake[0].y > canvas.height - 10;

    if(bitten || touchWallLeft || toucheWallRight || touchWallTop || toucheWallBottom){
        gameOver = true;
    }

    return gameOver;
}

function restart(){
    const restart = document.getElementById("restart");
    restart.style.visibility = "visible";
    
    document.addEventListener("keydown", (event) => {
        if(event.code === "Space"){
            document.location.reload();
        }
    })
}     