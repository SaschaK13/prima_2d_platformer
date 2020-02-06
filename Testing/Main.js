"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let root;
    window.addEventListener("load", test);
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new fudge.TextureImage();
        txtImage.image = img;
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        let lg = new Game.LevelGenerator();
        lg.loadFile();
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            // ƒ.Debug.log(frame);
            // root.showFrameNext();
            root.broadcastEvent(new CustomEvent("showNext"));
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map