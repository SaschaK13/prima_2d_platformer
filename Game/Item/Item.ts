namespace Game {

  import fudge = FudgeCore;

  export class Item extends fudge.Node {

    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;

    private stats: characterStats

    constructor(nodeName: string, stats: characterStats) {
      super(nodeName)
      let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1,0,1,1)))
      this.addComponent(new fudge.ComponentMaterial(material))

      let cmpMesh = new fudge.ComponentMesh(Item.mesh)
      this.addComponent(cmpMesh)

      let cmpTrans = new fudge.ComponentTransform()
      this.addComponent(cmpTrans)

      this.cmpTransform.local.translateY(+1.5)

      this.stats = stats;
    }

  }
}