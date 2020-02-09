
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
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);


    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
    let material2: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));

    let player: Player = new Player("test");
    player.addComponent(new fudge.ComponentMaterial(material));
    player.cmpTransform.local.translateY(0.5);
    collidableNode.appendChild(player);

    let lvlGenerator = new LevelGenerator(collidableNode);
    lvlGenerator.getDataFromFile()

    document.addEventListener("keydown", handleKeyboard )
    document.addEventListener("keyup", handleKeyboard )


    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 60);


    //after world gen add collidable objects to Util 



    function handleKeyboard(event: KeyboardEvent): void {
      keysPressed[event.code] = (event.type == "keydown");
    }

    function processInput(): void {
      if(keysPressed[fudge.KEYBOARD_CODE.SPACE]) {
        player.jump()
        return;
      }
      
      if(keysPressed[fudge.KEYBOARD_CODE.D])
      {
        player.walk(DIRECTION.RIGHT)
        return;
      }

      if(keysPressed[fudge.KEYBOARD_CODE.A])
      {
        player.walk(DIRECTION.LEFT)
        return;
      }


    }

    function update(_event: fudge.Eventƒ): void {
      processInput()
      viewport.draw();
     // fudge.Debug.log(player.collideWith(plattform));
    }
  }
}