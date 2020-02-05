"use strict";
var Game;
(function (Game) {
    class Player extends Game.Character {
        constructor(nodeName) {
            super(nodeName);
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map