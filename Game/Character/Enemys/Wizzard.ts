namespace Game {

  import fudge = FudgeCore;

  export class Wizzard extends Character {
    public attacksPlayer: boolean = false;
    public name: string;
    public positionX: number;
    public positionY: number;
    public scaleX: number;
    public scaleY: number;

    private teleportCooldown: number = 100;
    private currentTeleportCooldown: number = 0;
    private shotcount: number = 0;

    private teleportDirection: DIRECTION = DIRECTION.LEFT;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);

      this.setStats({ hp: 15, dmg: 0, walkSpeed: 2, jumpHeight: 0, attackSpeed: 100 });

      //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      //this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }

    public die(): void {
      this.showOneTime(CHARACTERSTATE.DEATH);
      this.isDead = true;

      //finish shows up after player kills endboss
      Util.getInstance().level.finish.cmpTransform.local.translation = this.cmpTransform.local.translation;

      setTimeout(() => { 
        this.getParent().removeChild(this);
        Util.getInstance().level.deleteEnemy(this);
       }, 400);
    }

    public attack(): void {
      if (this.attackCooldown == 0 && !Util.getInstance().level.player.finished) {
        Util.getInstance().level.player.takeDmg(1);
        this.attacksPlayer = true;
        this.isAttacking = true;
        this.showOneTime(CHARACTERSTATE.ATTACK);
        this.attackCooldown = this.getStats().attackSpeed;
      }
    }

    public ki(): void {
      let player: Player = Util.getInstance().level.player;

      if (this.currentPlatform && player.currentPlatform) {
        if (this.currentPlatform.name == player.currentPlatform.name) {
          if (this.currentTeleportCooldown == this.teleportCooldown) {
            this.teleport(this.teleportDirection);
            this.currentTeleportCooldown = 0;
          } else {
            this.currentTeleportCooldown++;
          }
        }
      }
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();

      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];

        switch (collisionObject.collisionType) {
          case COLLISIONTYPE.ENEMY: {
            break;
          }
          case COLLISIONTYPE.ENVIRONMENT: {
            if (collisionObject.object.constructor.name == "Platform") {
              this.currentPlatform = collisionObject.object as Platform;
            }
            this.handleSolidColision(collisionObject);
            break;
          }
          case COLLISIONTYPE.PLAYER: {
            this.handleSolidColision(collisionObject);
            break;
          }
        }
      }
    }

    private setDirection(): void {
      switch (this.teleportDirection) {
        case DIRECTION.LEFT: {
          this.teleportDirection = DIRECTION.RIGHT;
          break;
        }
        case DIRECTION.RIGHT: {
          this.teleportDirection = DIRECTION.LEFT;
          break;
        } 
      }
    }

    private shoot(): void {
      this.showOneTime(CHARACTERSTATE.ATTACK);
      let spells: WizzardSpell = new WizzardSpell("spell" + this.shotcount, ENVIRONMENTTYPE.PLATFORM, "spell", this.cmpTransform.local.translation.x , this.cmpTransform.local.translation.y - 0.3, 0.5,0.5);
      spells.shotdirection = this.teleportDirection ;
      Util.getInstance().level.addWizardSpell(spells);
      this.shotcount++;
    }

    private teleport(direction: DIRECTION): void {
      let posX: number = this.cmpTransform.local.translation.x;
      let posY: number = this.cmpTransform.local.translation.y;

      switch (direction) {
        case DIRECTION.LEFT: {
          this.look(this.teleportDirection);
          this.cmpTransform.local.translation = new fudge.Vector3(posX - 8, posY + 0.5, 0);
          this.setDirection();
          this.shoot();
          break;
        }
        case DIRECTION.RIGHT: {
          this.look(this.teleportDirection);
          this.cmpTransform.local.translation = new fudge.Vector3(posX + 8, posY+ 0.5, 0);
          this.setDirection();
          this.shoot();
          break;
        }
      }
    }

    private behavior = (_event: fudge.Eventƒ): void => {
      if (!this.isDead && this.isLoaded) {
        this.ki();
      }
    }
  }
}