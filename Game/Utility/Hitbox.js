"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Hitbox extends fudge.Node {
        constructor(nodeName, parentNode, scaling) {
            super(nodeName);
            this.parentNode = parentNode;
            this.scaling = scaling;
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0.3, 1, 1, 1)));
            let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(new fudge.ComponentMaterial(material));
            this.addComponent(cmpMesh);
            this.addComponent(cmpTransform);
            this.currentDirection = Game.DIRECTION.RIGHT;
            this.cmpTransform.local.translation = parentNode.cmpTransform.local.translation;
            this.cmpTransform.local.scaling = this.scaling.toVector3();
            this.cmpTransform.local.translateX((parentNode.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2));
            parentNode.appendChild(this);
        }
        detectHit() {
        }
    }
    Hitbox.mesh = new fudge.MeshQuad;
    Game.Hitbox = Hitbox;
})(Game || (Game = {}));
//# sourceMappingURL=Hitbox.js.map