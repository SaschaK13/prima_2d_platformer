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
            Game.Util.getInstance().level.enemyArray = newEnemyArray;
        }
        getCollidableObjects() {
            let collidableNodes = [];
            for (var i = 0; i < this.platformArray.length; i++) {
                collidableNodes.push(this.platformArray[i]);
            }
            for (var i = 0; i < this.enemyArray.length; i++) {
                collidableNodes.push(this.enemyArray[i]);
            }
            collidableNodes.push(this.player);
            return collidableNodes;
        }
    }
    Game.Level = Level;
})(Game || (Game = {}));
//# sourceMappingURL=Level.js.map