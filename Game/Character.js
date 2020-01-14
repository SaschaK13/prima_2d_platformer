"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            let cmpMesh = new fudge.ComponentMesh(Character.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
        }
    }
    Character.mesh = new fudge.MeshQuad;
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map