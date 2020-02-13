namespace Game {

  import fudge = FudgeCore;

  export class Item extends fudge.Node {

    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;

    public spriteName: string;
    public hp: number;
    public dmg: number;
    public jumpHeight: number;
    public walkSpeed: number;
    public attackSpeed: number;
    private stats: CharacterStats = {hp: 1, dmg: 1, jumpHeight: 1, walkSpeed: 1, attackSpeed: 1};

    constructor(nodeName: string, spriteName: string, hp: number, dmg: number, jumpHeight: number, walkSpeed: number, attackSpeed: number) {
      super(nodeName);
      this.spriteName = spriteName;
      this.hp = hp;
      this.dmg = dmg;
      this.jumpHeight = jumpHeight;
      this.walkSpeed = walkSpeed;
      this.attackSpeed = attackSpeed;

      let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1,0,1,1)))
      this.addComponent(new fudge.ComponentMaterial(material));

      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Item.mesh);
      this.addComponent(cmpMesh);

      let cmpTrans: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpTrans);

      this.cmpTransform.local.translateY(+1.5);

      this.stats.hp = this.hp;
      this.stats.dmg = this.dmg;
      this.stats.jumpHeight = this.jumpHeight;
      this.stats.walkSpeed = this.walkSpeed;
      this.stats.attackSpeed = this.attackSpeed;

    }

    public getStats(): CharacterStats {
      return this.stats;
    }

  }
}