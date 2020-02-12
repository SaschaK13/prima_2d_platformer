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
      
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      super.addSpriteListener();
    }

    takeDmg(dmgTaken: number): void {      
      super.takeDmg(dmgTaken);
      Util.getInstance().gui.updateHealth(this);
    }

    attack(): void {
      if (this.attackCooldown == 0) {
        let detectedEnemys: Character[] = this.hitbox.detectEnemys() as Character[];
        for (var i: number = 0; i < detectedEnemys.length; i++) {
          detectedEnemys[i].takeDmg(this.getStats().dmg);   
        }
        this.showOneTime(CHARACTERSTATE.ATTACK);
        this.attackCooldown = this.getStats().attackspeed;
      }
      
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects(); 

      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];
        
        switch (collisionObject.collisionType) {
          case CollisionType.ENEMY: {
            this.takeDmg(1);
            super.handleSolidColision(collisionObject);
          }

          case CollisionType.ENVIRONMENT: {
            super.handleSolidColision(collisionObject);
          }
        }
      }
    }
  }
}
