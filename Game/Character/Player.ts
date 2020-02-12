namespace Game {

  import fudge = FudgeCore;
  export class Player extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      super.spriteName = spriteName;
     /* let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
      this.addComponent(new fudge.ComponentMaterial(material))*/
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      super.addSpriteListener();

    }

    takeDmg(dmgTaken: number): void {
      Util.getInstance().gui.updateHealth(dmgTaken);
      super.takeDmg(dmgTaken);
    }

    attack(): void {
      if (this.attackCooldown == 0) {
        let detectedEnemys: Enemy[] = this.hitbox.detectEnemys() as Enemy[];
        for (var i = 0; i < detectedEnemys.length; i++) {
          detectedEnemys[i].takeDmg(this.getStats().dmg);   
        }
        this.attackCooldown = this.getStats().attackspeed;
      }
      this.show(CHARACTERSTATE.ATTACK);
      // fudge.Debug.log("attack");
    } 
  }
}
