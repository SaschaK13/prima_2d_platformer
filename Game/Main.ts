
namespace Game {
  import fudge = FudgeCore;

  window.addEventListener("load", test);
  let root: fudge.Node;
  let collidableNode: fudge.Node;

  interface KeyPressed {
    [code: string]: boolean;
  }

  let keysPressed: KeyPressed = {};

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize(true, false);

    root = new fudge.Node("Root");
    collidableNode = new fudge.Node("collidable");
    root.appendChild(collidableNode);

    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(15);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
    let viewport: fudge.Viewport = new fudge.Viewport();

    let cameraOrbit = new fudge.Node("CameraOrbit");
    cameraOrbit.addComponent(new fudge.ComponentTransform());
    cameraOrbit.addComponent(cmpCamera);

    root.appendChild(cameraOrbit)

    viewport.initialize("Viewport", root, cameraOrbit.getComponent(fudge.ComponentCamera), canvas);


    loadGame()

    document.addEventListener("keydown", handleKeyboard);
    document.addEventListener("keyup", handleKeyboard);

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);

    //after world gen add collidable objects to Util 

    function handleKeyboard(event: KeyboardEvent): void {
      keysPressed[event.code] = (event.type == "keydown");
    }

    function processInput(): void {
      let player: Player = Util.getInstance().level.player;
      if (!player.isDead) {
        if (keysPressed[fudge.KEYBOARD_CODE.SPACE]) {
          player.jump();
          return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.D]) {
          player.walk(DIRECTION.RIGHT);
          return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.A]) {
          player.walk(DIRECTION.LEFT);
          return;
        }
        if (keysPressed[fudge.KEYBOARD_CODE.E]) {
          player.attack();
          return;
        }
        player.idle();
      }
    }

    function update(_event: fudge.Eventƒ): void {
      processInput();
      viewport.draw();
      cameraOrbit.cmpTransform.local.translation = new fudge.Vector3(Util.getInstance().level.player.cmpTransform.local.translation.x, cameraOrbit.cmpTransform.local.translation.y, cameraOrbit.cmpTransform.local.translation.z)
      updateGameObjects()


      //fudge.RenderManager.update()
    }


    function loadGame() {

      fudge.Debug.log("Game loaded")
      loadSprites();

      let gui: Gui = new Gui(2, 5, 1, 50);
      Util.getInstance().gui = gui;

      let lvlGenerator: LevelGenerator = new LevelGenerator(collidableNode);
      lvlGenerator.getDataFromFile();


    }

    function updateGameObjects() {
      //load platform 
      let platformArray = Util.getInstance().level.platformArray;

      for (var i = 0; i < platformArray.length; i++) {
        let platform = platformArray[i];
        let showed = isInViewPort(platform);
        if (showed && !platform.isLoaded) {
          collidableNode.appendChild(platform);
          platform.isLoaded = true;
        } else if (!showed && platform.isLoaded) {
          collidableNode.removeChild(platform);
          platform.isLoaded = false;
        }

      }

      //Load Enemys
      let enemyArray = Util.getInstance().level.enemyArray;
      for (var i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i] as Character;
        let showed = isInViewPort(enemy);
        if (showed && !enemy.isLoaded) {
          collidableNode.appendChild(enemy);
          enemy.cmpTransform.local.translateY(1);
          fudge.Debug.log("Enemy loaded")
          enemy.isLoaded = true;

        } else if (!showed && enemy.isLoaded) {
          collidableNode.removeChild(enemy);
          enemy.isLoaded = false;
          fudge.Debug.log("Enemy destroyed")
        }

      }

      //load Background
      let backGroundArray = Util.getInstance().level.backgroundArray;
      for (var i = 0; i < backGroundArray.length; i++) {
        let backGround = backGroundArray[i] as Background;
        let showed = isBackgroundInViewPort(backGround);
        if (showed && !backGround.isLoaded) {
          fudge.Debug.log("Bacvkground created")
          collidableNode.appendChild(backGround);
          backGround.isLoaded = true;

        } else if (!showed && backGround.isLoaded) {
          fudge.Debug.log("Bacvkground deleted")
          collidableNode.removeChild(backGround);
          backGround.isLoaded = false;
        }

      }

      //Check if Player is in ViewPort 
      let player = Util.getInstance().level.player;
      let showed = isInViewPort(player);
      if (!showed && player.isLoaded) {
        player.die()
      }

    }

    function isBackgroundInViewPort(background: Background) {
      let camSize = new fudge.Vector2(40, 10);
      let camPosition = cameraOrbit.cmpTransform.local.translation;
      let leftBorder = camPosition.x - (camSize.x / 2)
      let rightBorder = camPosition.x + (camSize.x / 2)

      let bottom = camPosition.y - (camSize.y / 2)
      let top = camPosition.y + (camSize.y / 2)

      let nodePosition = background.cmpTransform.local.translation;
      let nodeLeftBorder = nodePosition.x - (background.length / 2)
      let nodeRightBorder = nodePosition.x + (background.length / 2)

      if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder) {
        return true;
      } else {
        return false;
      }
    }



    function isInViewPort(node: fudge.Node): boolean {
      let camSize = new fudge.Vector2(20, 10);
      let camPosition = cameraOrbit.cmpTransform.local.translation;
      let leftBorder = camPosition.x - (camSize.x / 2)
      let rightBorder = camPosition.x + (camSize.x / 2)

      let bottom = camPosition.y - (camSize.y / 2)
      let top = camPosition.y + (camSize.y / 2)

      let nodePosition = node.cmpTransform.local.translation;
      let nodeLeftBorder = nodePosition.x - (node.cmpTransform.local.scaling.x / 2)
      let nodeRightBorder = nodePosition.x + (node.cmpTransform.local.scaling.x / 2)

      let nodeTop = nodePosition.y + (node.cmpTransform.local.scaling.y / 2)
      let nodeBottom = nodePosition.y - (node.cmpTransform.local.scaling.y / 2)

      if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder && nodeTop >= bottom && nodeBottom <= top) {
        return true;
      } else {
        return false;
      }
    }
  }
}