"use strict";
var Game;
(function (Game) {
    class Gui {
        constructor() {
            this.initialHealth = 5;
            this.initialWalkSpeed = 1;
            this.initialJumpingPower = 1;
        }
        updateHealth(damage) {
            this.initialHealth = this.initialHealth - damage;
            document.getElementById("health").setAttribute("src", "../Game/Assets/herz" + this.initialHealth + ".png");
        }
        updateWalkSpeed(speedFactor) {
            this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
            document.getElementById("speed").innerHTML = "walk speed: " + this.initialWalkSpeed;
        }
        updateJumpingPower(jumpingFactor) {
            this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
            document.getElementById("jumping").innerHTML = "jumping power: " + this.initialJumpingPower;
        }
    }
    Game.Gui = Gui;
})(Game || (Game = {}));
//# sourceMappingURL=GUI.js.map