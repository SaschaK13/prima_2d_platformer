"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.transcmp = new fudge.ComponentTransform();
            this.addComponent(this.transcmp);
        }
        collideWith(colissionObject) {
            let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
            let colissionObjectScaling = colissionObject.getComponent(fudge.ComponentMesh).pivot.scaling;
            let characterPosition = this.cmpTransform.local.translation;
            let CharacterScaling = this.getComponent(fudge.ComponentMesh).pivot.scaling;
            if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
                characterPosition.x + CharacterScaling.x > colissionObjectPosition.x &&
                characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
                characterPosition.y + CharacterScaling.y > colissionObjectPosition.y) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map