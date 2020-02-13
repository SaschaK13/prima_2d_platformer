namespace Game {
  import fudge = FudgeCore;

  export class Finish extends Environment {

    constructor(nodeName: string)
    {
      super(nodeName, "Platform")
      
      this.cmpTransform.local.translateY(1);
      let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)))
      this.addComponent(new fudge.ComponentMaterial(material));
    }


  }
}