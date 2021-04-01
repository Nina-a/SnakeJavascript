const canvas = document.getElementById('canvas');
const contexte = canvas.getContext('2d');

// -----------------------------VARIABLES-----------------------------------

// Speed on x
var speedx = 0;
// Speed on y
var speedy = 10;

// ---------------------Création du serpent-----------------------------
let snake = [{x:140, y:150},{x:130, y:150},{x:120, y:150},{x:110, y:150}];

function Animation(){
    setTimeout(function(){
        CleanCanvas();
        MoveForwardSnake();
        DrawSnake();
        Animation();
    },100)
}

Animation();

function CleanCanvas(){
    // Canvas's color
    contexte.fillStyle = "white";
    // Stroke's color
    contexte.strokeStyle ="black";
    // Canvas's position
    contexte.fillRect(0,0,canvas.width, canvas.height);
    contexte.strokeRect(0,0,canvas.width, canvas.height);
}

function DrawPiecesSnake(piece){
    contexte.fillStyle = "#00fe14"
    contexte.strokeStyle = "black"
    contexte.fillRect(piece.x, piece.y, 10, 10);
    contexte.strokeRect(piece.x, piece.y, 10, 10);
}

function DrawSnake(){
    snake.forEach(piece => {
        DrawPiecesSnake(piece);
    })
}

// ---------------------Création du serpent-----------------------------
function MoveForwardSnake() {
    const head = {x: snake[0].x + speedx, y: snake[0].y -speedy}
    snake.unshift(head);
    snake.pop();
}

MoveForwardSnake();
MoveForwardSnake();
MoveForwardSnake();
DrawSnake();


