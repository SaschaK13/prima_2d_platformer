"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(nodeName) {
            super(nodeName);
        }
        takeDmg(dmgTaken) {
            Game.Util.getInstance().gui.updateHealth(dmgTaken);
            super.takeDmg(dmgTaken);
        }
        //Cooldown
        attack() {
            if (this.attackCooldown == 0) {
                let detectedEnemys = this.hitbox.detectEnemys();
                for (var i = 0; i < detectedEnemys.length; i++) {
                    detectedEnemys[i].takeDmg(this.getStats().dmg);
                    fudge.Debug.log(detectedEnemys[i].getStats().hp);
                }
                this.attackCooldown = this.getStats().attackspeed;
            }
        }
    }
    Game.Player = Player;
})(Game || (Game = {}));
//# sourceMappingURL=Player.js.map