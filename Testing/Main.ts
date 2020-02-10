namespace Game {
  import fudge = FudgeCore;

  let root: fudge.Node;
  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }

  
  function test(): void {
    let keysPressed: KeyPressed = {};

    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: fudge.TextureImage = new fudge.TextureImage();
    txtImage.image = img;
   
    fudge.RenderManager.initialize(true, false);
    root = new fudge.Node("Root");

    let levelGenerator = new LevelGenerator(root);
    levelGenerator.getDataFromFile();

    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
    let material2: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));

    let player = new fudge.Node("player")

    let mesh = new fudge.MeshQuad();
    let cmpMesh  = new fudge.ComponentMesh(mesh);
    player.addComponent(cmpMesh);

    player.addComponent(new fudge.ComponentMaterial(material))

    let cmpTrans = new fudge.ComponentTransform();
    player.addComponent(cmpTrans);


    player.cmpTransform.local.translateX(2)
    root.appendChild(player)
    

    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(10);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");

    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    document.addEventListener("keydown", handleKeyboard )
    document.addEventListener("keyup", handleKeyboard )

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);

    function handleKeyboard(event: KeyboardEvent): void {
      keysPressed[event.code] = (event.type == "keydown");
    }

    function processInput(): void {
      if(keysPressed[fudge.KEYBOARD_CODE.D])
      {
        player.cmpTransform.local.translateX(0.2)
        return
      }

      if(keysPressed[fudge.KEYBOARD_CODE.A])
      {
        player.cmpTransform.local.translateX(-0.2)
        return

      }

      if(keysPressed[fudge.KEYBOARD_CODE.W])
      {
        player.cmpTransform.local.translateY(0.2)
        return

      }

      if(keysPressed[fudge.KEYBOARD_CODE.S])
      {
        player.cmpTransform.local.translateY(-0.2)
        return

      }


    }

    function update(_event: fudge.Eventƒ): void {
 
      processInput()
      let objects: fudge.Node[] = root.getChildren()
      for(var i = 0; i < objects.length; i++) {

        let node: fudge.Node = objects[i]
        if( node.name != player.name)
        {
          collideWith(node);
        }
      } 
      viewport.draw();

    }


    function collideWith(colissionObject: fudge.Node) {
      let colissionObjectPosition: fudge.Vector3 = colissionObject.cmpTransform.local.translation;
      //let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
      let colissionObjectScaling: fudge.Vector3 = colissionObject.cmpTransform.local.scaling;


      let characterPosition: fudge.Vector3 = player.cmpTransform.local.translation;
      let characterScaling: fudge.Vector3 = player.cmpTransform.local.scaling;
      //let characterScaling: fudge.Vector3 = (player.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
    
      if (characterPosition.x - (characterScaling.x /2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
        characterPosition.x + (characterScaling.x/2) > colissionObjectPosition.x - (colissionObjectScaling.x /2) &&
        characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y/2) &&
        characterPosition.y + (characterScaling.y /2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
        
        fudge.Debug.log("isColliding");

  
        } else {
         
          

        }
    }
  }
}