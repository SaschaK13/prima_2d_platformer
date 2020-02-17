"use strict";
var Game;
(function (Game) {
    class Savegame {
        constructor(levelName, hp, dmg, jumpHeight, walkSpeed, attackSpeed) {
            this.levelName = levelName;
            this.hp = hp;
            this.attackSpeed = attackSpeed;
            this.dmg = dmg;
            this.jumpHeight = jumpHeight;
            this.walkSpeed = walkSpeed;
        }
    }
    Game.Savegame = Savegame;
})(Game || (Game = {}));
//# sourceMappingURL=SaveGame.js.map