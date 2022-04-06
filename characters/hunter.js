let LivingCreature = require('./livingCreature.js');


module.exports = class Hunter extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 40;
    }

    mul() {
        super.getNewCoordinates();
        let hnCells = super.randommm(super.chooseCell(1));

        if (hnCells) {
            let newX = hnCells[0];
            let newY = hnCells[1];
            let hn = new Hunter(newX, newY, this.index);
            hunterArr.push(hn);


            matrix[newY][newX] = this.index;

            this.energy = 40;
        }

    }
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

            this.energy--;
            if (this.energy <= 0) {
                this.die();
            }
        }
        else if (grCells) {
            let newX = grCells[0];
            let newY = grCells[1];


            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

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
            for (let i in hunterArr) {
                if (this.x == hunterArr[i].x && this.y == hunterArr[i].y) {
                    hunterArr.splice(i, 1);
                    matrix[this.y][this.x] = 0;
                    break;
                }
            }
        }
    }


    eat() {
        super.getNewCoordinates();
        let newCell = super.randommm(super.chooseCell(3));
        if (newCell) {
            this.energy++;
            if (this.energy >= 50) {
                this.mul();
            }
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = this.index;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
            for (let i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this.move();
        }
    }
}