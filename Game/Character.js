"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.mesh = new fudge.MeshQuad;
            let cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map