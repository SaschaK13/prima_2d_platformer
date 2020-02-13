"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let EnvironmentType;
    (function (EnvironmentType) {
        EnvironmentType["PLATFORM"] = "Platform";
    })(EnvironmentType = Game.EnvironmentType || (Game.EnvironmentType = {}));
    class Environment extends fudge.Node {
        constructor(nodeName, type) {
            super(nodeName);
            this.isLoaded = false;
            this.type = this.parseStringToEnviornmentType(type);
            let cmpMesh = new fudge.ComponentMesh(Environment.mesh);
            this.addComponent(cmpMesh);
            let cmpTransform = new fudge.ComponentTransform();
            this.addComponent(cmpTransform);
        }
        //TODO adapt to environment
        addSpriteListener() {
            for (let key of Game.Util.getInstance().spritesMap.get(this.spriteName).keys()) {
                let sprite = Game.Util.getInstance().spritesMap.get(this.spriteName).get(key);
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(true);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
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