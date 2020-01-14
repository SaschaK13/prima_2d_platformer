/// <reference path="../L14_ScrollerFoundation/SpriteGenerator.ts"/>
namespace Game {
  import fudge = FudgeCore;
  import Sprite = L14_ScrollerFoundation.Sprite;
  import NodeSprite = L14_ScrollerFoundation.NodeSprite;

  window.addEventListener("load", test);
  let sprite: Sprite;
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
    let player = new Player("jeff");
    player.addComponent(new fudge.ComponentMaterial(material));

    root.appendChild(player);
    


    let viewport: fudge.Viewport = new fudge.Viewport();
    viewport.initialize("Viewport", root, cmpCamera, canvas);
    viewport.draw();


  }
}