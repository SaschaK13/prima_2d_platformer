"use strict";
var Game;
(function (Game) {
    class Gui {
        constructor(initialWalkSpeed, initialJumpingPower, initialDamage, initialAttackSpeed) {
            this.initialHealth = 5;
            this.initialWalkSpeed = initialWalkSpeed;
            this.initialJumpingPower = initialJumpingPower;
            this.initialDamage = initialDamage;
            this.initialAttackSpeed = initialAttackSpeed;
        }
        updateHealth(character) {
            this.initialHealth = character.getStats().hp;
            document.getElementById("health").setAttribute("src", "../Game/Assets/health/heart" + this.initialHealth + ".png");
        }
        updateWalkSpeed(speedFactor) {
            this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
            document.getElementById("speed").innerHTML = this.initialWalkSpeed.toString();
        }
        updateJumpingPower(jumpingFactor) {
            this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
            document.getElementById("jumping").innerHTML = this.initialJumpingPower.toString();
        }
        updateDamage(damageFactor) {
            this.initialDamage = this.initialDamage + damageFactor;
            document.getElementById("damage").innerHTML = this.initialDamage.toString();
        }
        updatAttackSpeed(attackSpeedFactor) {
            this.initialAttackSpeed = this.initialAttackSpeed + attackSpeedFactor;
            document.getElementById("attackSpeed").innerHTML = this.initialAttackSpeed.toString();
        }
    }
    Game.Gui = Gui;
})(Game || (Game = {}));
//# sourceMappingURL=GUI.js.map