"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let EnvironmentType;
    (function (EnvironmentType) {
        EnvironmentType["PLATFORM"] = "Platform";
    })(EnvironmentType = Game.EnvironmentType || (Game.EnvironmentType = {}));
    class Environment extends fudge.Node {
        //private static materials: fudge.Material;
        constructor(nodeName, type) {
            super(nodeName);
            this.type = this.parseStringToEnviornmentType(type);
            let cmpMesh = new fudge.ComponentMesh(Environment.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
        }
        parseStringToEnviornmentType(s) {
            switch (s) {
                case "Platform": {
                    return EnvironmentType.PLATFORM;
                }
            }
        }
    }
    Environment.mesh = new fudge.MeshQuad;
    Game.Environment = Environment;
})(Game || (Game = {}));
//# sourceMappingURL=Environment.js.map