"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    var Character = Game.Character;
    window.addEventListener("load", test);
    let root;
    function test() {
        let canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize(true, false);
        root = new fudge.Node("Root");
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translateZ(5);
        cmpCamera.pivot.lookAt(fudge.Vector3.ZERO());
        cmpCamera.backgroundColor = fudge.Color.CSS("aliceblue");
        let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
        // let player: Player = new Player("test");
        // fudge.Debug.log(player);
        //player.addComponent(new fudge.ComponentMaterial(material));
        let c = new Character("test");
        root.appendChild(c);
        let viewport = new fudge.Viewport();
        viewport.initialize("Viewport", root, cmpCamera, canvas);
        viewport.draw();
    }
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map