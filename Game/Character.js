"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            this.speed = 0;
            this.fallSpeed = new fudge.Vector2(0, -1);
            this.update = (_event) => {
                let timeFrame = fudge.Loop.timeFrameGame / 1000;
                this.cmpTransform.local.translate(new fudge.Vector3(this.fallSpeed.x, this.fallSpeed.y * timeFrame, 0));
                //fudge.Debug.log(this.fallSpeed);
                this.cmpTransform.local.translateX(this.speed * timeFrame);
                this.broadcastEvent(new CustomEvent("showNext"));
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.transcmp = new fudge.ComponentTransform();
            this.addComponent(this.transcmp);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
    }
    Character.speedMax = 1.5; // units per second
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map