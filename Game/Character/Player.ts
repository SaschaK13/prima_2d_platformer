namespace Game {

  import fudge = FudgeCore;
  export class Player extends Character {
    public name: string;
    public positionX: number;
    public positionY: number;
    public scaleX: number;
    public scaleY: number;
    public finished: boolean = false;
    public playerStats: CharacterStats;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      super.spriteName = spriteName;

      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      super.addSpriteListener();
      
      this.playerStats = {hp: 10, walkSpeed: 2, jumpHeight: 6, dmg: 1, attackSpeed: 50};
      this.setStats(this.playerStats);
    }

    public takeDmg(dmgTaken: number): void {
      if (this.currentDmgCooldown == 0) {
        Util.getInstance().hurtSound.play();
      }
      super.takeDmg(dmgTaken);
      Util.getInstance().gui.updateStats(this);
    }

    public jump(): void {
      if (!this.isJumping) {
        Util.getInstance().jumpSound.play();
      }
      super.jump();
    }

    public attack(): void {
      if (this.attackCooldown == 0) {
        let detectedEnemys: Character[] = this.hitbox.detectEnemys() as Character[];
        for (var i: number = 0; i < detectedEnemys.length; i++) {
          detectedEnemys[i].takeDmg(this.getStats().dmg);
        }
        this.isAttacking = true;
        this.showOneTime(CHARACTERSTATE.ATTACK);
        this.attackCooldown = this.getStats().attackSpeed;
        Util.getInstance().attackSound.play();
      } else {
        this.isAttacking = false;
      }
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();
      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];

        switch (collisionObject.collisionType) {
          case COLLISIONTYPE.ENEMY: {
            if (collisionObject.object.constructor.name == "Blob" && !this.finished) {
              if (!this.isDead) {
                this.takeDmg(1);
              }
            }
            super.handleSolidColision(collisionObject);
            break;
          }
          case COLLISIONTYPE.ENVIRONMENT: {
            if (collisionObject.object.constructor.name == "Platform") {
              this.currentPlatform = collisionObject.object as Platform;
            }
            super.handleSolidColision(collisionObject);
            break;
          }
          case COLLISIONTYPE.FINISH: {
            if (!this.finished) {
              this.hittedFinish();
            }
            break;
          }

          case COLLISIONTYPE.WIZZARDSPELL: {
            if(!this.finished)
            {
              this.takeDmg(1);
            }
          }

          case COLLISIONTYPE.ITEM: {
            let item: Item = collisionObject.object as Item;
            Util.getInstance().pickUpSound.play();
            this.updateStats(item.getStats());
            Util.getInstance().level.deleteItem(item);
            this.getParent().removeChild(item);
            break;
          }
        }
      }
    }

    private hittedFinish(): void {
      this.finished = true;
      document.getElementById("safeGame").style.visibility = "visible";
    }
  }
}