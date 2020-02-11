"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    let root;
    window.addEventListener("load", test);
    let CollisionDirection;
    (function (CollisionDirection) {
        CollisionDirection["TOP"] = "Top";
        CollisionDirection["BOTTOM"] = "Bottom";
        CollisionDirection["RIGHT"] = "Right";
        CollisionDirection["LEFT"] = "Left";
        CollisionDirection["ERROR"] = "Error";
    })(CollisionDirection || (CollisionDirection = {}));
    function test() {
        let keysPressed = {};
        let img = document.querySelector("img");
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        let txtImage = new fudge.TextureImage();
        let oldTrans;
        txtImage.image = img;
        let collissionObjects;
        let oldCollisionObjects;
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
            oldCollisionObjects = collissionObjects;
            collissionObjects = [];
            for (var i = 0; i < objects.length; i++) {
                let node = objects[i];
                if (node.name != player.name) {
                    collideWith(node);
                }
            }
            updateCollisionObjects();
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
                let direction = getCollisionDirection(colissionObject);
                collissionObjects.push({ object: colissionObject, collisionDirectin: direction });
            }
            else {
            }
            oldTrans = player.cmpTransform.local.translation;
        }
        function getCollisionDirection(colissionObject) {
            let objectLeft = player.cmpTransform.local.translation.x - (player.cmpTransform.local.scaling.x / 2);
            let objectRight = player.cmpTransform.local.translation.x + (player.cmpTransform.local.scaling.x / 2);
            let objectTop = player.cmpTransform.local.translation.y - (player.cmpTransform.local.scaling.y / 2);
            let objectBottom = player.cmpTransform.local.translation.y + (player.cmpTransform.local.scaling.y / 2);
            let objectOldLeft = oldTrans.x - (player.cmpTransform.local.scaling.x / 2);
            let objectOldRight = oldTrans.x + (player.cmpTransform.local.scaling.x / 2);
            let objectOldTop = oldTrans.y - (player.cmpTransform.local.scaling.y / 2);
            let objectOldBottom = oldTrans.y + (player.cmpTransform.local.scaling.y / 2);
            let collissionObjectLeft = colissionObject.cmpTransform.local.translation.x - (colissionObject.cmpTransform.local.scaling.x / 2);
            let collissionObjectRight = colissionObject.cmpTransform.local.translation.x + (colissionObject.cmpTransform.local.scaling.x / 2);
            let collissionObjectTop = colissionObject.cmpTransform.local.translation.y - (colissionObject.cmpTransform.local.scaling.y / 2);
            let collissionObjectBottom = colissionObject.cmpTransform.local.translation.y + (colissionObject.cmpTransform.local.scaling.y / 2);
            if (objectOldBottom <= collissionObjectTop && objectBottom >= collissionObjectTop)
                return CollisionDirection.TOP;
            if (objectOldTop >= collissionObjectBottom && objectTop <= collissionObjectBottom)
                return CollisionDirection.BOTTOM;
            if (objectOldRight <= collissionObjectLeft && objectRight >= collissionObjectLeft)
                return CollisionDirection.RIGHT;
            if (objectOldLeft >= collissionObjectRight && objectLeft <= collissionObjectRight)
                return CollisionDirection.LEFT;
            return CollisionDirection.ERROR;
        }
        function updateCollisionObjects() {
            for (var i = 0; i < oldCollisionObjects.length; i++) {
                let oldObject = oldCollisionObjects[i];
                for (var j = 0; j < collissionObjects.length; j++) {
                    let newObject = collissionObjects[j];
                    if (oldObject.object.name == newObject.object.name) {
                        if (newObject.collisionDirectin == CollisionDirection.ERROR) {
                            newObject.collisionDirectin = oldObject.collisionDirectin;
                        }
                    }
                }
            }
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map