"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Environment extends fudge.Node {
        //private static materials: fudge.Material;
        constructor(nodeName) {
            super(nodeName);
            let cmpMesh = new fudge.ComponentMesh(Environment.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
        }
    }
    Environment.mesh = new fudge.MeshQuad;
    Game.Environment = Environment;
})(Game || (Game = {}));
//# sourceMappingURL=Environment.js.map