const canvas = document.getElementById('canvas');
const contexte = canvas.getContext('2d');

// ---------------------Représentation du carré-----------------------------
// Canvas's color
contexte.fillStyle = "white";
// Stroke's color
contexte.strokeStyle ="black";
// Canvas's position
contexte.fillRect(0,0,canvas.width, canvas.height);
contexte.strokeRect(0,0,canvas.width, canvas.height);

// ---------------------Création du serpent-----------------------------
let snake = [{x:140, y:150},{x:130, y:150},{x:120, y:150},{x:110, y:150}];

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

DrawSnake();