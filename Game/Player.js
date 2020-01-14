"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
    }
    Player.mesh = new fudge.MeshCube();
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map