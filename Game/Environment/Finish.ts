namespace Game {
  import fudge = FudgeCore;

  export class Finish extends Environment {
    public name: string;

    constructor(name: string, type: string, spriteName: string) {
      super(name, type);
      this.name = name;
      super.spriteName = spriteName;
      // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
      // this.addComponent(new fudge.ComponentMaterial(material));
      
      super.addSpriteListener();
    }
  }
}