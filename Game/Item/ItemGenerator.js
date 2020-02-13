"use strict";
var Game;
(function (Game) {
    class ItemGenerator {
        constructor(root) {
            this.itemObject = new Game.Level();
            this.root = root;
        }
    }
    Game.ItemGenerator = ItemGenerator;
})(Game || (Game = {}));
//# sourceMappingURL=ItemGenerator.js.map