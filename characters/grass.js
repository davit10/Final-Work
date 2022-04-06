let LivingCreature = require('./livingCreature.js');

module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    mul() {
        this.multiply++;
        let emptyCells = super.randommm(super.chooseCell(0));
        if (this.multiply >= 8 && emptyCells) {
            let newX = emptyCells[0];
            let newY = emptyCells[1];
            let gr = new Grass(newX, newY, this.index);
            grassArr.push(gr);

            matrix[newY][newX] = this.index;
            this.multiply = 0;
        }
    }
}