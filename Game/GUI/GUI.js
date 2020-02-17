"use strict";
var Game;
(function (Game) {
    class Gui {
        constructor() {
            this.initialHealth = 0;
            this.initialWalkSpeed = 0;
            this.initialJumpingPower = 0;
            this.initialDamage = 0;
            this.initialAttackSpeed = 0;
        }
        updateStats(player) {
            this.initialHealth = Game.Util.getInstance().numberToOneDecimal(player.getStats().hp);
            document.getElementById("health").setAttribute("src", "Assets/health/heart" + this.initialHealth + ".png");
            this.initialWalkSpeed = Game.Util.getInstance().numberToOneDecimal(player.getStats().walkSpeed);
            document.getElementById("speed").innerHTML = this.initialWalkSpeed.toString();
            this.initialJumpingPower = Game.Util.getInstance().numberToOneDecimal(player.getStats().jumpHeight);
            document.getElementById("jumping").innerHTML = this.initialJumpingPower.toString();
            this.initialDamage = Game.Util.getInstance().numberToOneDecimal(player.getStats().dmg);
            document.getElementById("damage").innerHTML = this.initialDamage.toString();
            this.initialAttackSpeed = Game.Util.getInstance().numberToOneDecimal(player.getStats().attackSpeed);
            document.getElementById("attackSpeed").innerHTML = this.initialAttackSpeed.toString();
        }
    }
    Game.Gui = Gui;
})(Game || (Game = {}));
//# sourceMappingURL=GUI.js.map