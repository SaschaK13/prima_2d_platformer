"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let root;
    window.addEventListener("load", test);
    function test() {
        let keysPressed = {};
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new fudge.TextureImage();
        txtImage.image = img;
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        let levelGenerator = new Game.LevelGenerator(root);
        levelGenerator.getDataFromFile();
        let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
        let material2 = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
        let player = new fudge.Node("player");
        let mesh = new fudge.MeshQuad();
        let cmpMesh = new fudge.ComponentMesh(mesh);
        player.addComponent(cmpMesh);
        player.addComponent(new fudge.ComponentMaterial(material));
        let cmpTrans = new fudge.ComponentTransform();
        player.addComponent(cmpTrans);
        player.cmpTransform.local.translateX(2);
        root.appendChild(player);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);
        function handleKeyboard(event) {
            keysPressed[event.code] = (event.type == "keydown");
        }
        function processInput() {
            if (keysPressed[fudge.KEYBOARD_CODE.D]) {
                player.cmpTransform.local.translateX(0.2);
                return;
            }
            if (keysPressed[fudge.KEYBOARD_CODE.A]) {
                player.cmpTransform.local.translateX(-0.2);
                return;
            }
            if (keysPressed[fudge.KEYBOARD_CODE.W]) {
                player.cmpTransform.local.translateY(0.2);
                return;
            }
            if (keysPressed[fudge.KEYBOARD_CODE.S]) {
                player.cmpTransform.local.translateY(-0.2);
                return;
            }
        }
        function update(_event) {
            processInput();
            let objects = root.getChildren();
            for (var i = 0; i < objects.length; i++) {
                let node = objects[i];
                if (node.name != player.name) {
                    collideWith(node);
                }
            }
            viewport.draw();
        }
        function collideWith(colissionObject) {
            let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
            //let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
            let colissionObjectScaling = colissionObject.cmpTransform.local.scaling;
            let characterPosition = player.cmpTransform.local.translation;
            let characterScaling = player.cmpTransform.local.scaling;
            //let characterScaling: fudge.Vector3 = (player.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
            if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
                characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
                characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
                characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
                fudge.Debug.log("isColliding");
            }
            else {
            }
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map