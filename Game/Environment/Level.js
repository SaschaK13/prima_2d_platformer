"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Level {
        constructor() {
            this.platformArray = [];
            this.enemyArray = [];
            this.itemArray = [];
            this.possibleItemsArray = [];
        }
        setRoot(root) {
            this.root = root;
        }
        appendToRoot(node) {
            this.root.appendChild(node);
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
        deleteItem(item) {
            let newItemArray = [];
            for (var i = 0; i < this.itemArray.length; i++) {
                if (!(this.itemArray[i].name == item.name)) {
                    newItemArray.push(this.itemArray[i]);
                }
            }
            Game.Util.getInstance().level.itemArray = newItemArray;
        }
        getCollidableObjects() {
            let collidableNodes = [];
            for (var i = 0; i < this.platformArray.length; i++) {
                collidableNodes.push(this.platformArray[i]);
            }
            for (var i = 0; i < this.enemyArray.length; i++) {
                collidableNodes.push(this.enemyArray[i]);
            }
            fudge.Debug.log(this.itemArray.length);
            for (var i = 0; i < this.itemArray.length; i++) {
                collidableNodes.push(this.itemArray[i]);
            }
            return collidableNodes;
        }
    }
    Game.Level = Level;
})(Game || (Game = {}));
//# sourceMappingURL=Level.js.map