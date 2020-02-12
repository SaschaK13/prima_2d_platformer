
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

    loadSprites();
    //fudge.Debug.log(Util.getInstance().spritesMap);

    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(15);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);

    let gui: Gui = new Gui(1, 1, 1, 1);
    Util.getInstance().gui = gui;

    let lvlGenerator: LevelGenerator = new LevelGenerator(collidableNode);
    lvlGenerator.getDataFromFile();

    let item = new Item("test", {hp: 10, dmg: -5})

    root.appendChild(item)

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
      if(keysPressed[fudge.KEYBOARD_CODE.E])
      {
        player.attack()
        return;
      }
      
      player.idle();

    }

    function update(_event: fudge.Eventƒ): void {
      processInput();
      viewport.draw();
      //fudge.RenderManager.update()
    }
  }
}