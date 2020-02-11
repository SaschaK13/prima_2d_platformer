"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Player extends Game.Character {
        constructor(name, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.name = name;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
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