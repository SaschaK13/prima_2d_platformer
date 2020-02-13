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
      if(this.getStats().hp >= 0){
        Util.getInstance().gui.updateHealth(this);  
      }
      super.takeDmg(dmgTaken);
     
    }

    attack(): void {
      if (this.attackCooldown == 0) {
        let detectedEnemys: Character[] = this.hitbox.detectEnemys() as Character[];
        for (var i: number = 0; i < detectedEnemys.length; i++) {
          detectedEnemys[i].takeDmg(this.getStats().dmg);   
        }
        fudge.Debug.log("test");
        this.isAttacking = true;
        this.showOneTime(CHARACTERSTATE.ATTACK);
        Util.getInstance().attackSound.play();
        this.attackCooldown = this.getStats().attackSpeed;
      }
    }

    die(): void {
      super.die();
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects(); 
      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];
        
        switch (collisionObject.collisionType) {
          case CollisionType.ENEMY: {
            if(collisionObject.object.constructor.name == "Blob")
            {
              this.takeDmg(1);
            }
            super.handleSolidColision(collisionObject);
            break;
          }

          case CollisionType.ENVIRONMENT: {
            if(collisionObject.object.constructor.name == "Platform")
            {
              this.currentPlatform = collisionObject.object as Platform;
            }
            super.handleSolidColision(collisionObject);
            break;
          }

          case CollisionType.ITEM: {
            let item = collisionObject.object as Item;
            this.updateStats(item.getStats());
            Util.getInstance().level.deleteItem(item);
            this.getParent().removeChild(item);
            break;
        }
      }
    }
  }
}

}