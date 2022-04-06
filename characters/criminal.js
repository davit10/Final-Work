let LivingCreature = require('./livingCreature.js');


module.exports = class Criminal extends LivingCreature {


    move() {
        super.getNewCoordinates();
        let emptyCells = super.randommm(super.chooseCell(0));
        let grCells = super.randommm(super.chooseCell(1));
        if (emptyCells) {
            let newX = emptyCells[0];
            let newY = emptyCells[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        else if (grCells) {
            let newX = grCells[0];
            let newY = grCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.x = newX;
            this.y = newY;

        }

    }

    eat() {
        super.getNewCoordinates();
        let rnd = Math.round(super.randommm(2, 4));
        let newCell = super.randommm(super.chooseCell(rnd));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            if (rnd == 3) {
                for (let i in predatorArr) {
                    if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (rnd == 2) {
                for (let i in grassEaterArr) {
                    if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
            }
            else if (rnd == 4) {
                for (let i in hunterArr) {
                    if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                        hunterArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
        else {
            this.move();
        }
    }
}