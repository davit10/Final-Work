let LivingCreature = require('./livingCreature.js');

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 13;
    }

    mul() {
        super.getNewCoordinates();
        let emptyCells = super.randommm(super.chooseCell(0));

        if (emptyCells) {

            let newX = emptyCells[0];
            let newY = emptyCells[1];
            let pre = new Predator(newX, newY, this.index);
            predatorArr.push(pre);

            matrix[newY][newX] = this.index;

            this.energy = 13;
        }

    }
    move() {
        super.getNewCoordinates();
        let emptyCells = super.randommm(super.chooseCell(0));




        if (emptyCells) {
            let newX = emptyCells[0];
            let newY = emptyCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }

    }
    die() {
        if (this.energy <= 0) {
            for (let i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }


    eat() {
        super.getNewCoordinates();
        let newCell = super.randommm(super.chooseCell(2));
        if (newCell) {
            this.energy++;
            if (this.energy >= 16) {
                this.mul();
            }
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (let i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
}