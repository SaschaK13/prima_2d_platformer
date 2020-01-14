"use strict";
var Game;
(function (Game) {
    var Character = Game.Character;
    class Player extends Character {
        constructor(nodeName) {
            super(nodeName);
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map