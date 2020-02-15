"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    window.addEventListener("load", test);
    let root;
    let saveGameName;
    let keysPressed = {};
    function test() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(15);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let viewport = new fudge.Viewport();
        let cameraOrbit = new fudge.Node("CameraOrbit");
        cameraOrbit.addComponent(new fudge.ComponentTransform());
        cameraOrbit.addComponent(cmpCamera);
        root.appendChild(cameraOrbit);
        viewport.initialize("Viewport", root, cameraOrbit.getComponent(fudge.ComponentCamera), canvas);
        loadGame();
        Game.Util.getInstance().themeSound.play();
        document.addEventListener("keydown", handleKeyboard);
        document.addEventListener("keyup", handleKeyboard);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);
        //after world gen add collidable objects to Util 
        function handleKeyboard(event) {
            keysPressed[event.code] = (event.type == "keydown");
        }
        function processInput() {
            let player = Game.Util.getInstance().level.player;
            if (!player.isDead) {
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
                if (keysPressed[fudge.KEYBOARD_CODE.E]) {
                    player.attack();
                    return;
                }
                player.idle();
            }
        }
        function update(_event) {
            processInput();
            viewport.draw();
            cameraOrbit.cmpTransform.local.translation = new fudge.Vector3(Game.Util.getInstance().level.player.cmpTransform.local.translation.x, cameraOrbit.cmpTransform.local.translation.y, cameraOrbit.cmpTransform.local.translation.z);
            updateGameObjects();
            //fudge.RenderManager.update()
        }
        function loadGame() {
            Game.Util.getInstance().collidableNode = new fudge.Node("collidable");
            Game.Util.getInstance().rootNode = root;
            root.appendChild(Game.Util.getInstance().collidableNode);
            Game.Util.getInstance().fetchAudios();
            Game.loadSprites();
            let gui = new Game.Gui();
            Game.Util.getInstance().gui = gui;
            saveGameName = urlParams.get('saveGamejson');
            if (saveGameName) {
                loadLevel(saveGameName);
            }
            else {
                Game.Util.getInstance().lvlGenerator = new Game.LevelGenerator(Game.Util.getInstance().collidableNode);
                Game.Util.getInstance().lvlGenerator.getDataFromFile("level1");
            }
        }
        function loadLevel(saveGamejson) {
            let data = JSON.parse(saveGamejson);
            Game.Util.getInstance().currentSavegame = data;
            Game.Util.getInstance().lvlGenerator = new Game.LevelGenerator(Game.Util.getInstance().collidableNode);
            Game.Util.getInstance().lvlGenerator.getDataFromFile(data.levelName);
        }
        function updateGameObjects() {
            //load platform 
            let platformArray = Game.Util.getInstance().level.platformArray;
            for (var i = 0; i < platformArray.length; i++) {
                let platform = platformArray[i];
                let showed = isInViewPort(platform);
                if (showed && !platform.isLoaded) {
                    Game.Util.getInstance().collidableNode.appendChild(platform);
                    platform.isLoaded = true;
                }
                else if (!showed && platform.isLoaded) {
                    Game.Util.getInstance().collidableNode.removeChild(platform);
                    platform.isLoaded = false;
                }
            }
            //Load Enemys
            let enemyArray = Game.Util.getInstance().level.enemyArray;
            for (var i = 0; i < enemyArray.length; i++) {
                let enemy = enemyArray[i];
                let showed = isInViewPort(enemy);
                if (showed && !enemy.isLoaded) {
                    Game.Util.getInstance().collidableNode.appendChild(enemy);
                    enemy.cmpTransform.local.translateY(1);
                    enemy.isLoaded = true;
                }
                else if (!showed && enemy.isLoaded) {
                    Game.Util.getInstance().collidableNode.removeChild(enemy);
                    enemy.isLoaded = false;
                }
            }
            //load Background
            let backGroundArray = Game.Util.getInstance().level.backgroundArray;
            for (var i = 0; i < backGroundArray.length; i++) {
                let backGround = backGroundArray[i];
                let showed = isBackgroundInViewPort(backGround);
                if (showed && !backGround.isLoaded) {
                    Game.Util.getInstance().collidableNode.appendChild(backGround);
                    backGround.isLoaded = true;
                }
                else if (!showed && backGround.isLoaded) {
                    Game.Util.getInstance().collidableNode.removeChild(backGround);
                    backGround.isLoaded = false;
                }
            }
            //Check if Player is in ViewPort 
            let player = Game.Util.getInstance().level.player;
            let showed = isInViewPort(player);
            if (!showed && player.isLoaded) {
                player.die();
            }
        }
        function isBackgroundInViewPort(background) {
            let camSize = new fudge.Vector2(40, 10);
            let camPosition = cameraOrbit.cmpTransform.local.translation;
            let leftBorder = camPosition.x - (camSize.x / 2);
            let rightBorder = camPosition.x + (camSize.x / 2);
            let bottom = camPosition.y - (camSize.y / 2);
            let top = camPosition.y + (camSize.y / 2);
            let nodePosition = background.cmpTransform.local.translation;
            let nodeLeftBorder = nodePosition.x - (background.length / 2);
            let nodeRightBorder = nodePosition.x + (background.length / 2);
            if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder) {
                return true;
            }
            else {
                return false;
            }
        }
        function isInViewPort(node) {
            let camSize = new fudge.Vector2(20, 10);
            let camPosition = cameraOrbit.cmpTransform.local.translation;
            let leftBorder = camPosition.x - (camSize.x / 2);
            let rightBorder = camPosition.x + (camSize.x / 2);
            let bottom = camPosition.y - (camSize.y / 2);
            let top = camPosition.y + (camSize.y / 2);
            let nodePosition = node.cmpTransform.local.translation;
            let nodeLeftBorder = nodePosition.x - (node.cmpTransform.local.scaling.x / 2);
            let nodeRightBorder = nodePosition.x + (node.cmpTransform.local.scaling.x / 2);
            let nodeTop = nodePosition.y + (node.cmpTransform.local.scaling.y / 2);
            let nodeBottom = nodePosition.y - (node.cmpTransform.local.scaling.y / 2);
            if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder && nodeTop >= bottom && nodeBottom <= top) {
                return true;
            }
            else {
                return false;
            }
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map