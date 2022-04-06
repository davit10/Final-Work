let socket = io();
let side = 20;


function setup (){
    createCanvas(20 * side, 20 * side);
    background("gray");
    

}


function nkarel(matrix){
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let x = j * side;
            let y = i * side;
            if (matrix[i][j] == 0) {
                fill("gray");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 1) {
                fill("green");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 2) {
                fill("yellow");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 3) {
                fill("red");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 4) {
                fill("blue");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 5) {
                fill("brown");
                rect(x, y, side, side);
            }
            else if (matrix[i][j] == 6) {
                fill("black");
                rect(x, y, side, side);
            }
        }
    }
};
socket.on('send matrix', nkarel);

function kill(){
    socket.emit('kill')
}
function addGrass(){
    socket.emit('addGrass')
}
function addGrassEater(){
    socket.emit('addGrassEater')
}
function addPredator(){
    socket.emit('addPredator')
}
function addHunter(){
    socket.emit('addHunter')
}
function addCriminal(){
    socket.emit('addCriminal')
}
function addBomb(){
    socket.emit('addBomb');
}