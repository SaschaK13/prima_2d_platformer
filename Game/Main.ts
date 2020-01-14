namespace Game {
  import fudge = FudgeCore;
  import Player = Game.Player;


  window.addEventListener("load", test);
  let root: fudge.Node;

  function test(): void {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    fudge.RenderManager.initialize(true, false);
    root = new fudge.Node("Root");

    let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
    cmpCamera.pivot.translateZ(5);
    cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
    cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");


    let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1,0,1,1)));
    let player: Player = new Player("test");
    fudge.Debug.log(player);
    player.addComponent(new fudge.ComponentMaterial(material));

    root.appendChild(player);
    
    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();


  }
}