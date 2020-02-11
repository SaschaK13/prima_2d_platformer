namespace Game {
  import fudge = FudgeCore;

  let root: fudge.Node;
  window.addEventListener("load", test);
  
  function test(): void {
    let img: HTMLImageElement = document.querySelector("img");
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = canvas.getContext("2d");
    let txtImage: fudge.TextureImage = new fudge.TextureImage();
    txtImage.image = img;
   
    fudge.RenderManager.initialize(true, false);
    root = new fudge.Node("Root");

    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
    let material2: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 1, 1)));

    let player: Player = new Player("test");
    //player.addComponent(new fudge.ComponentMaterial(material));
    player.cmpTransform.local.translateY(0.5);
    root.appendChild(player);

    let levelGenerator = new LevelGenerator(root);
    levelGenerator.getDataFromFile();

    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");

    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
    fudge.Loop.start(fudge.LOOP_MODE.TIME_GAME, 10);

    function update(_event: fudge.Eventƒ): void {
      // ƒ.Debug.log(frame);
      // root.showFrameNext();
      root.broadcastEvent(new CustomEvent("showNext"));
      viewport.draw();
      crc2.strokeRect(-1, -1, canvas.width / 2, canvas.height + 2);
      crc2.strokeRect(-1, canvas.height / 2, canvas.width + 2, canvas.height);
    }
  }
}