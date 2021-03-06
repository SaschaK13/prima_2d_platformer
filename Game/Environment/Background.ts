namespace Game {

  import fudge = FudgeCore;

  export class Background extends Environment {
    public name: string;
    public length: number;

    constructor(name: string, type: string, spriteName: string, length: number) {
      super(name, type);
      this.name = name;
      this.length = length;
      super.spriteName = spriteName;
      // this.cmpTransform.local.translation = new fudge.Vector3(0, 0, -1);
      this.cmpTransform.local.scaling = new fudge.Vector3(1, 1, 0);
      // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
      // this.addComponent(new fudge.ComponentMaterial(material));
      super.addSpriteListener();
    }
  }
}