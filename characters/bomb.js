let LivingCreature = require("./livingCreature");

module.exports = class Bomb extends LivingCreature {

    appear() {
        for (let i = 5; i <= 29; i++) {
            super.getNewCoordinates();
            let arg = super.chooseCell(Math.floor(i / 5));
            let cell = super.randommm(arg);
            if (cell) {
                let x = cell[0];
                let y = cell[1];
                matrix[y][x] = 0;
                matrix[this.y][this.x] = 0;
            }
        }
    }
}