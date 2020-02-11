namespace Game {
  import fudge = FudgeCore;


  let root: fudge.Node;
  window.addEventListener("load", test);

  interface KeyPressed {
    [code: string]: boolean;
  }


  enum CollisionDirection {
    TOP = "Top",
    BOTTOM = "Bottom",
    RIGHT = "Right",
    LEFT = "Left",
    ERROR = "Error"
  }

  interface collidedObject {
    object: fudge.Node,
    collisionDirectin: CollisionDirection
  }

  function test(): void {
    let keysPressed: KeyPressed = {};

    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: fudge.TextureImage = new fudge.TextureImage();
    let oldTrans: fudge.Vector3;
    txtImage.image = img;

    let collissionObjects: collidedObject[];
    let oldCollisionObjects: collidedObject[];

    let gui: Gui = new Gui();

    fudge.RenderManager.initialize(true, false);
    root = new fudge.Node("Root");

    let levelGenerator: LevelGenerator = new LevelGenerator(root);
    levelGenerator.getDataFromFile();

    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
    let material2: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));

    let player = new fudge.Node("player")

    let mesh = new fudge.MeshQuad();
    let cmpMesh = new fudge.ComponentMesh(mesh);
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

    document.addEventListener("keydown", handleKeyboard)
    document.addEventListener("keyup", handleKeyboard)

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 1);

    function handleKeyboard(event: KeyboardEvent): void {
      keysPressed[event.code] = (event.type == "keydown");
    }

    function processInput(): void {
      if (keysPressed[fudge.KEYBOARD_CODE.D]) {
        player.cmpTransform.local.translateX(0.2)
        return
      }

      if (keysPressed[fudge.KEYBOARD_CODE.A]) {
        player.cmpTransform.local.translateX(-0.2)
        return

      }

      if (keysPressed[fudge.KEYBOARD_CODE.W]) {
        player.cmpTransform.local.translateY(0.2)
        return

      }

      if (keysPressed[fudge.KEYBOARD_CODE.S]) {
        player.cmpTransform.local.translateY(-0.2)
        return

      }


    }

    function update(_event: fudge.Eventƒ): void {

      processInput()
      let objects: fudge.Node[] = root.getChildren()
      oldCollisionObjects = collissionObjects;
  
      collissionObjects = []
      for (var i = 0; i < objects.length; i++) {

        let node: fudge.Node = objects[i]
        if (node.name != player.name) {
          collideWith(node);
        }
      }
      updateCollisionObjects();
      viewport.draw();

    }


    function collideWith(colissionObject: fudge.Node) {
      let colissionObjectPosition: fudge.Vector3 = colissionObject.cmpTransform.local.translation;
      //let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
      let colissionObjectScaling: fudge.Vector3 = colissionObject.cmpTransform.local.scaling;


      let characterPosition: fudge.Vector3 = player.cmpTransform.local.translation;
      let characterScaling: fudge.Vector3 = player.cmpTransform.local.scaling;
      //let characterScaling: fudge.Vector3 = (player.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
        characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
        characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
        characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {

          let direction = getCollisionDirection(colissionObject);
          collissionObjects.push({object:colissionObject, collisionDirectin: direction })
         
      } else {


      }

      oldTrans = player.cmpTransform.local.translation

    
    }

    function getCollisionDirection(colissionObject: fudge.Node): CollisionDirection {
      let objectLeft = player.cmpTransform.local.translation.x - (player.cmpTransform.local.scaling.x / 2)
      let objectRight = player.cmpTransform.local.translation.x + (player.cmpTransform.local.scaling.x / 2)
      let objectTop = player.cmpTransform.local.translation.y - (player.cmpTransform.local.scaling.y / 2)
      let objectBottom = player.cmpTransform.local.translation.y + (player.cmpTransform.local.scaling.y / 2)

      let objectOldLeft = oldTrans.x - (player.cmpTransform.local.scaling.x / 2)
      let objectOldRight = oldTrans.x + (player.cmpTransform.local.scaling.x / 2)
      let objectOldTop = oldTrans.y - (player.cmpTransform.local.scaling.y / 2)
      let objectOldBottom = oldTrans.y + (player.cmpTransform.local.scaling.y / 2)

      

      let collissionObjectLeft = colissionObject.cmpTransform.local.translation.x - (colissionObject.cmpTransform.local.scaling.x / 2)
      let collissionObjectRight = colissionObject.cmpTransform.local.translation.x + (colissionObject.cmpTransform.local.scaling.x / 2)
      let collissionObjectTop = colissionObject.cmpTransform.local.translation.y - (colissionObject.cmpTransform.local.scaling.y / 2)
      let collissionObjectBottom = colissionObject.cmpTransform.local.translation.y + (colissionObject.cmpTransform.local.scaling.y / 2)

      if (objectOldBottom <= collissionObjectTop && objectBottom >= collissionObjectTop) return CollisionDirection.TOP
      if (objectOldTop >= collissionObjectBottom && objectTop <= collissionObjectBottom) return CollisionDirection.BOTTOM
      if (objectOldRight <= collissionObjectLeft && objectRight >= collissionObjectLeft) return CollisionDirection.RIGHT
      if (objectOldLeft >= collissionObjectRight && objectLeft <= collissionObjectRight) return CollisionDirection.LEFT

      return CollisionDirection.ERROR

    }


    function updateCollisionObjects()
    {

      for(var i = 0; i < oldCollisionObjects.length; i++)
      {
        let oldObject = oldCollisionObjects[i];
        for(var j = 0; j < collissionObjects.length; j++)
        {
          let newObject = collissionObjects[j]
          if(oldObject.object.name ==  newObject.object.name)
          {
            if(newObject.collisionDirectin == CollisionDirection.ERROR)
            {
              newObject.collisionDirectin = oldObject.collisionDirectin
            }
          }
        }

      }
    }
  }
}