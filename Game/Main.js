"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.addEventListener("load", test);
    let root;
    let collidableNode;
    let keysPressed = {};
    function test() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        collidableNode = new fudge.Node("collidable");
        root.appendChild(collidableNode);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(10);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
        let material2 = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));
        let player = new Game.Player("test");
        //player.addComponent(new fudge.ComponentMaterial(material2));
        player.cmpTransform.local.translateY(1);
        collidableNode.appendChild(player);
        let lvlGenerator = new Game.LevelGenerator(collidableNode);
        lvlGenerator.getDataFromFile();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 15);
        //after world gen add collidable objects to Util 
        function handleKeyboard(event) {
            keysPressed[event.code] = (event.type == "keydown");
        }
        function processInput() {
            if (keysPressed[fudge.KEYBOARD_CODE.SPACE]) {
                player.jump();
                return;
            }
            if (keysPressed[fudge.KEYBOARD_CODE.D]) {
                player.walk(Game.DIRECTION.RIGHT);
                return;
            }
            if (keysPressed[fudge.KEYBOARD_CODE.A]) {
                player.walk(Game.DIRECTION.LEFT);
                return;
            }
        }
        function update(_event) {
            processInput();
            viewport.draw();
            // fudge.Debug.log(player.collideWith(plattform));
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map