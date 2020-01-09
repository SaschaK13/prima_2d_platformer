"use strict";
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
var L14_ScrollerHare;
/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
(function (L14_ScrollerHare) {
    var ƒ = FudgeCore;
    var Sprite = L14_ScrollerFoundation.Sprite;
    var NodeSprite = L14_ScrollerFoundation.NodeSprite;
    window.addEventListener("load", test);
    let sprite;
    let root;
    function test() {
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        sprite = new Sprite("Char");
        sprite.generateByGrid(txtImage, ƒ.Rectangle.GET(609, 10, 64, 64), 6, new ƒ.Vector2(100, 0), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
        ƒ.RenderManager.initialize(true, false);
        root = new ƒ.Node("Root");
        let mtxHare;
        let hare;
        hare = new NodeSprite("Hare0", sprite);
        hare.setFrameDirection(-1);
        root.appendChild(hare);
        for (let child of root.getChildren())
            child.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(ƒ.Vector3.ZERO());
        cmpCamera.backgroundColor = ƒ.Color.CSS("aliceblue");
        let viewport = new ƒ.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_GAME, 10);
        function update(_event) {
            // ƒ.Debug.log(frame);
            // root.showFrameNext();
            root.broadcastEvent(new CustomEvent("showNext"));
            viewport.draw();
            crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
            crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
        }
    }
})(L14_ScrollerHare || (L14_ScrollerHare = {}));
//# sourceMappingURL=Main.js.map