namespace Game {

  import fudge = FudgeCore;

  export class Enemy extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;

    constructor(name: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 0, 1, 1)));
      this.addComponent(new fudge.ComponentMaterial(material));
    }
  }
}