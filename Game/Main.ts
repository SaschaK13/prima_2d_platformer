
namespace Game {
  import fudge = FudgeCore;

  window.addEventListener("load", loadMain);
  let root: fudge.Node;
  let saveGameName: string;

  interface KeyPressed {
    [code: string]: boolean;
  }

  let keysPressed: KeyPressed = {};

  function loadMain(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize(true, false);

    root = new fudge.Node("Root");

    const queryString: string = window.location.search;
    const urlParams: URLSearchParams = new URLSearchParams(queryString);

    //camera
    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(15);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
    let viewport: fudge.Viewport = new fudge.Viewport();

    let cameraOrbit: fudge.Node = new fudge.Node("CameraOrbit");
    cameraOrbit.addComponent(new fudge.ComponentTransform());
    cameraOrbit.addComponent(cmpCamera);
    root.appendChild(cameraOrbit);

    viewport.initialize("Viewport", root, cameraOrbit.getComponent(fudge.ComponentCamera), canvas);

    loadGame();

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

        if (keysPressed[fudge.KEYBOARD_CODE.E]) {
          player.attack();
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
      
        player.idle();
      }
    }

    function update(_event: fudge.Eventƒ): void {
      processInput();
      viewport.draw();
      cameraOrbit.cmpTransform.local.translation = new fudge.Vector3(Util.getInstance().level.player.cmpTransform.local.translation.x, cameraOrbit.cmpTransform.local.translation.y, cameraOrbit.cmpTransform.local.translation.z)
      updateGameObjects();
      fudge.Debug.log(Util.getInstance().level.player.getStats().hpaa)
      //fudge.RenderManager.update()
    }

    function loadGame(): void {
      Util.getInstance().collidableNode = new fudge.Node("collidable"); 
      Util.getInstance().rootNode = root;
      root.appendChild(Util.getInstance().collidableNode);

      Util.getInstance().fetchAudios();

      loadSprites();

      let gui: Gui = new Gui();
      Util.getInstance().gui = gui;

      saveGameName = urlParams.get('saveGamejson');
      if (saveGameName) {
        loadLevel(saveGameName);
      } else {
        Util.getInstance().lvlGenerator = new LevelGenerator(Util.getInstance().collidableNode);
        Util.getInstance().lvlGenerator.getDataFromFile("level1");
      }

    
     
    }

    function loadLevel(saveGamejson: string): void {
      let data: Savegame = JSON.parse(saveGamejson);
      Util.getInstance().currentSavegame = data;
      Util.getInstance().lvlGenerator = new LevelGenerator(Util.getInstance().collidableNode);
      Util.getInstance().lvlGenerator.getDataFromFile(data.levelName);
    }

    function updateGameObjects(): void {
      //load platform 
      let platformArray: Platform[] = Util.getInstance().level.platformArray;

      for (var i: number = 0; i < platformArray.length; i++) {
        let platform: Platform = platformArray[i];
        let showed: boolean = isInViewPort(platform);
        if (showed && !platform.isLoaded) {
          Util.getInstance().collidableNode.appendChild(platform);
          platform.isLoaded = true;
        } else if (!showed && platform.isLoaded) {
          Util.getInstance().collidableNode.removeChild(platform);
          platform.isLoaded = false;
        }
      }

      //Load Enemys
      let enemyArray: Character[] = Util.getInstance().level.enemyArray;
      for (var i: number = 0; i < enemyArray.length; i++) {
        let enemy: Character = enemyArray[i] as Character;
        let showed: boolean = isInViewPort(enemy);
        if (showed && !enemy.isLoaded) {
          Util.getInstance().collidableNode.appendChild(enemy);
          enemy.cmpTransform.local.translateY(1);
          enemy.isLoaded = true;
        } else if (!showed && enemy.isLoaded) {
          Util.getInstance().collidableNode.removeChild(enemy);
          enemy.isLoaded = false;
        }
      }

      //load Background
      let backGroundArray: Background[] = Util.getInstance().level.backgroundArray;
      for (var i = 0; i < backGroundArray.length; i++) {
        let backGround: Background = backGroundArray[i] as Background;
        let showed: boolean = isBackgroundInViewPort(backGround);
        if (showed && !backGround.isLoaded) {
          Util.getInstance().collidableNode.appendChild(backGround);
          backGround.isLoaded = true;
        } else if (!showed && backGround.isLoaded) {
          Util.getInstance().collidableNode.removeChild(backGround);
          backGround.isLoaded = false;
        }
      }

      //Check if Player is in ViewPort 
      let player: Player = Util.getInstance().level.player;
      let showed: boolean = isInViewPort(player);
      if (!showed && player.isLoaded && player.cmpTransform.local.translation.y < (cameraOrbit.cmpTransform.local.translation.y - 5)) {
        player.die();
      }
    }

    function isBackgroundInViewPort(background: Background): boolean {
      let camSize: fudge.Vector2 = new fudge.Vector2(40, 10);
      let camPosition: fudge.Vector3 = cameraOrbit.cmpTransform.local.translation;
      let leftBorder: number = camPosition.x - (camSize.x / 2);
      let rightBorder: number = camPosition.x + (camSize.x / 2);

      let nodePosition: fudge.Vector3 = background.cmpTransform.local.translation;
      let nodeLeftBorder: number = nodePosition.x - (background.length / 2);
      let nodeRightBorder: number = nodePosition.x + (background.length / 2);

      if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder) {
        return true;
      } else {
        return false;
      }
    }

    function isInViewPort(node: fudge.Node): boolean {
      let camSize: fudge.Vector2 = new fudge.Vector2(20, 10);
      let camPosition: fudge.Vector3 = cameraOrbit.cmpTransform.local.translation;
      let leftBorder: number = camPosition.x - (camSize.x / 2);
      let rightBorder: number = camPosition.x + (camSize.x / 2);

      let bottom: number = camPosition.y - (camSize.y / 2);
      let top: number = camPosition.y + (camSize.y / 2);

      let nodePosition: fudge.Vector3 = node.cmpTransform.local.translation;
      let nodeLeftBorder: number = nodePosition.x - (node.cmpTransform.local.scaling.x / 2);
      let nodeRightBorder: number = nodePosition.x + (node.cmpTransform.local.scaling.x / 2);

      let nodeTop: number = nodePosition.y + (node.cmpTransform.local.scaling.y / 2);
      let nodeBottom: number = nodePosition.y - (node.cmpTransform.local.scaling.y / 2);

      if (nodeRightBorder >= leftBorder && nodeLeftBorder <= rightBorder && nodeTop >= bottom && nodeBottom <= top) {
        return true;
      } else {
        return false;
      }
    }
  }
}