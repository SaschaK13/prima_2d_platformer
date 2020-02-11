"use strict";
var Game;
(function (Game) {
    class Enemy extends Game.Character {
        constructor(nodeName) {
            super(nodeName);
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map