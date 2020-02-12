"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Blob extends Game.Enemy {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name, spriteName, Game.enemyType.BLOB, positionX, positionY, scaleX, scaleY);
            super.setStat({ hp: 3, dmg: 0, walk_speed: 4, jump_height: 0, attackspeed: 0 });
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.ki);
        }
        ki() {
        }
    }
    Game.Blob = Blob;
})(Game || (Game = {}));
//# sourceMappingURL=Blob.js.map