namespace Game {

  import fudge = FudgeCore;
  export class Player extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;
    finish: boolean = false;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      super.spriteName = spriteName;

      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      super.addSpriteListener();
    }

    takeDmg(dmgTaken: number): void {
      if(this.currentDmgCooldown == 0)
      {
        Util.getInstance().hurtSound.play()
        Util.getInstance().gui.updateHealth();

      }
      super.takeDmg(dmgTaken);

    }

    jump()
    {
      if(!this.isJumping){
        Util.getInstance().jumpSound.play()
      }
      super.jump()
    }

    attack(): void {
      if (this.attackCooldown == 0) {
        let detectedEnemys: Character[] = this.hitbox.detectEnemys() as Character[];
        for (var i: number = 0; i < detectedEnemys.length; i++) {
          detectedEnemys[i].takeDmg(this.getStats().dmg);
        }
        this.isAttacking = true;
       //this.showOneTime(CHARACTERSTATE.ATTACK);
       this.newShowOneTime(CHARACTERSTATE.ATTACK);
        this.attackCooldown = this.getStats().attackSpeed;
        Util.getInstance().attackSound.play();
      }else{
       // this.isAttacking = false;
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
            if (collisionObject.object.constructor.name == "Blob" && !this.finish) {
              this.takeDmg(1);
            }
            super.handleSolidColision(collisionObject);
            break;
          }

          case CollisionType.ENVIRONMENT: {
            if (collisionObject.object.constructor.name == "Platform") {
              this.currentPlatform = collisionObject.object as Platform;
            }
            super.handleSolidColision(collisionObject);
            break;
          }

          case CollisionType.FINISH: {
            if(!this.finish)
            {
              this.hittedFinish()
            }
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

    private hittedFinish() {
      this.finish = true;
      document.getElementById("safeGame").style.visibility = "visible";
    }
  }

}