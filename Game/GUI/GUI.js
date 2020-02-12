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
        updateHealth(damageAndHeal) {
            this.initialHealth = this.initialHealth - damageAndHeal;
            document.getElementById("health").setAttribute("src", "../Game/Assets/health/heart" + this.initialHealth + ".png");
        }
        updateWalkSpeed(speedFactor) {
            this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
            document.getElementById("speed").innerHTML = "walk speed: " + this.initialWalkSpeed;
        }
        updateJumpingPower(jumpingFactor) {
            this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
            document.getElementById("jumping").innerHTML = "jumping power: " + this.initialJumpingPower;
        }
        updateDamage(damageFactor) {
            this.initialDamage = this.initialDamage + damageFactor;
            document.getElementById("damage").innerHTML = "damage: " + this.initialDamage;
        }
        updatAttackSpeed(attackSpeedFactor) {
            this.initialAttackSpeed = this.initialAttackSpeed + attackSpeedFactor;
            document.getElementById("attackSpeed").innerHTML = "attack speed: " + this.initialAttackSpeed;
        }
    }
    Game.Gui = Gui;
})(Game || (Game = {}));
//# sourceMappingURL=GUI.js.map