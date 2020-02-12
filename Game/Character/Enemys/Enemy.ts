
namespace Game {

  import fudge = FudgeCore;

 export enum enemyType{
   BLOB = "blob"
 }

  export class Enemy extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;
    enemyType: enemyType;

    constructor(name: string, spriteName: string, enemyType: enemyType, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      super.spriteName = spriteName;
      this.enemyType = enemyType;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
      this.addComponent(new fudge.ComponentMaterial(material));
    }


    public die()
    {
      this.getParent().removeChild(this)
      Util.getInstance().level.deleteEnemy(this)
    }
  }
}