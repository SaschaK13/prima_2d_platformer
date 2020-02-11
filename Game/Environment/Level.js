"use strict";
var Game;
(function (Game) {
    class Level {
        constructor() {
            this.platformArray = [];
            this.enemyArray = [];
        }
        deleteEnemy(enemy) {
            let newEnemyArray = [];
            for (var i = 0; i < this.enemyArray.length; i++) {
                if (!(this.enemyArray[i].name == enemy.name)) {
                    newEnemyArray.push(this.enemyArray[i]);
                }
            }
            let colldableArray = Game.Util.getInstance().getCollidableObjects();
            let newCollidableArray = [];
            for (var i = 0; i < colldableArray.length; i++) {
                if (!(colldableArray[i].name == enemy.name)) {
                    newCollidableArray.push(colldableArray[i]);
                }
            }
            Game.Util.getInstance().setCollidableObjects(newCollidableArray);
            Game.Util.getInstance().level.enemyArray = newEnemyArray;
        }
    }
    Game.Level = Level;
})(Game || (Game = {}));
//# sourceMappingURL=Level.js.map