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
            this.cmpTransform = new fudge.ComponentTransform();
            this.addComponent(this.cmpTransform);
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map