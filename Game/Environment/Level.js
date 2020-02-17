"use strict";
var Game;
(function (Game) {
    class Level {
        constructor() {
            this.platformArray = [];
            this.backgroundArray = [];
            this.enemyArray = [];
            this.itemArray = [];
            this.possibleItemsArray = [];
            this.wizzardSpells = [];
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
        addWizardSpell(spell) {
            this.wizzardSpells.push(spell);
            this.root.appendChild(spell);
        }
        removeWizzardSpell(spell) {
            let newSpellArray = [];
            for (var i = 0; i < this.wizzardSpells.length; i++) {
                if (!(this.wizzardSpells[i].name == spell.name)) {
                    newSpellArray.push(this.wizzardSpells[i]);
                }
            }
            Game.Util.getInstance().level.wizzardSpells = newSpellArray;
            this.root.removeChild(spell);
        }
        getCollidableObjects() {
            let collidableNodes = [];
            for (var i = 0; i < this.platformArray.length; i++) {
                if (this.platformArray[i].isLoaded) {
                    collidableNodes.push(this.platformArray[i]);
                }
            }
            for (var i = 0; i < this.enemyArray.length; i++) {
                if (this.enemyArray[i].isLoaded) {
                    collidableNodes.push(this.enemyArray[i]);
                }
            }
            for (var i = 0; i < this.wizzardSpells.length; i++) {
                collidableNodes.push(this.wizzardSpells[i]);
            }
            for (var i = 0; i < this.itemArray.length; i++) {
                collidableNodes.push(this.itemArray[i]);
            }
            collidableNodes.push(this.player);
            collidableNodes.push(this.finish);
            return collidableNodes;
        }
    }
    Game.Level = Level;
})(Game || (Game = {}));
//# sourceMappingURL=Level.js.map