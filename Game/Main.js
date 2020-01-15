"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.addEventListener("load", test);
    let root;
    function test() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
        let material2 = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));
        let player = new Game.Player("test");
        let plattform = new Game.Platform("boden1");
        player.addComponent(new fudge.ComponentMaterial(material));
        plattform.addComponent(new fudge.ComponentMaterial(material2));
        plattform.cmpTransform.local.translateY(-0.8);
        root.appendChild(player);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);
        root.appendChild(plattform);
        fudge.Debug.log(player.collideWith(plattform));
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        function update(_event) {
            viewport.draw();
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map