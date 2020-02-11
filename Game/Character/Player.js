"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(nodeName) {
            super(nodeName);
        }
        //Cooldown
        attack() {
            let detectedEnemys = this.hitbox.detectEnemys();
            for (var i = 0; i < detectedEnemys.length; i++) {
                detectedEnemys[i].takeDmg(this.getStats().dmg);
                fudge.Debug.log(detectedEnemys[i].getStats().hp);
            }
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map