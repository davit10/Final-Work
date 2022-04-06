let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let fs = require('fs');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000)


function random(min, max) {
    return Math.random() * (max - min) + min;
}
matrix = matrixGenerator(20, 20);



function matrixGenerator(m, n) {
    let matrix = [];
    for (let i = 0; i < m; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            let rnd = random(0, 100);

            if (rnd <= 30) {
                matrix[i][j] = 1;
            }
            else if (rnd > 30 && rnd <= 50) {
                matrix[i][j] = 2;
            }
            else if (rnd > 50 && rnd <= 55) {
                matrix[i][j] = 3;
            }
            else if (rnd > 65 && rnd <= 66) {
                matrix[i][j] = 4;
            }
            else if (rnd > 80 && rnd <= 81) {
                matrix[i][j] = 5;
            }
            else if (rnd > 81 && rnd <= 84) {
                matrix[i][j] = 6;
            }
            else {
                matrix[i][j] = 0;
            }
        }
    }
    return matrix;

}
io.sockets.emit("send matrix", matrix)

grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
criminalArr = [];
bombArr = [];

grCount = 0;
greCount = 0;
preCount = 0;
hunCount = 0;
criCount = 0;
bmCount = 0;

Grass = require('./characters/grass')
GrassEater = require('./characters/GrassEater');
Predator = require('./characters/Predator');
Hunter = require('./characters/Hunter');
Criminal = require('./characters/criminal')
Bomb = require('./characters/bomb')


function createObject() {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y, 2);
                grassEaterArr.push(gre);
            }
            else if (matrix[y][x] == 3) {
                let pre = new Predator(x, y, 3);
                predatorArr.push(pre);
            }
            else if (matrix[y][x] == 4) {
                let hn = new Hunter(x, y, 4);
                hunterArr.push(hn);
            }
            else if (matrix[y][x] == 5) {
                let cr = new Criminal(x, y, 5);
                criminalArr.push(cr);
            }
            else if (matrix[y][x] == 6) {
                let bm = new Bomb(x, y, 6);
                bombArr.push(bm);
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    hunterArr = [];
    criminalArr = [];
    bombArr = [];
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
            matrix[x][y] = 0;
        }
    }
}
function addGrass() {

    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 1;
        let gr = new Grass(x, y, 1);
        grassArr.push(gr);
    }

}
function addGrassEater() {
    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 2;
        let gre = new GrassEater(x, y, 2);
        grassEaterArr.push(gre);
    }
}
function addPredator() {
    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 3;
        let pr = new Predator(x, y, 3);
        predatorArr.push(pr);
    }
}
function addHunter() {
    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 4;
        let hn = new Hunter(x, y, 4);
        hunterArr.push(hn);
    }
}
function addCriminal() {
    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 5;
        let cr = new Criminal(x, y, 5);
        criminalArr.push(cr);
    }
}
function addBomb() {
    let x = Math.floor(Math.random() * matrix[0].length);
    let y = Math.floor(Math.random() * matrix.length);
    if (matrix[y][x] == 0) {
        matrix[y][x] = 6;
        let bm = new Bomb(x, y, 6);
        bombArr.push(bm);
    }
}


function game() {

    for (let i in grassArr) {
        grassArr[i].mul();

    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }
    for (let i in hunterArr) {
        hunterArr[i].eat();
    }
    for (let i in criminalArr) {
        criminalArr[i].eat();
    }
    for (let i in bombArr) {
        bombArr[i].appear();
    }
    io.sockets.emit("send matrix", matrix)
}
setInterval(game, 1000)
io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on('addGrass', addGrass);
    socket.on('addGrassEater', addGrassEater);
    socket.on('addPredator', addPredator);
    socket.on('addHunter', addHunter);
    socket.on('addCriminal', addCriminal);
    socket.on('addBomb', addBomb);
});

let statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.multyplayer = hunterArr.length;
    statistics.colorChanger = criminalArr.length;
    fs.writeFileSync("statistics.json", JSON.stringify(statistics))
}, 1000)






