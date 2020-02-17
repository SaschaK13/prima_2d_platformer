namespace Game {

  import fudge = FudgeCore;

  export class Wizzard extends Character {
    public attacksPlayer: boolean = false;
    public name: string;
    public positionX: number;
    public positionY: number;
    public scaleX: number;
    public scaleY: number;
    private dropChance: number = 0.4;
    private lookAroundCooldown: number = 50;
    private currentLookAroundCooldown: number = 0;
    private moveDirection: DIRECTION = DIRECTION.RIGHT;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);

      let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
      this.addComponent(new fudge.ComponentMaterial(material));
      
      this.setStats({ hp: 3, dmg: 0, walkSpeed: 2, jumpHeight: 0, attackSpeed: 100 });

      //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      //this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }

    public die(): void {
      if (Math.random() < this.dropChance) {
        this.dropItem();
      }
      this.showOneTime(CHARACTERSTATE.DEATH);
      this.isDead = true;

      setTimeout(() => { 
        this.getParent().removeChild(this);
        Util.getInstance().level.deleteEnemy(this);
       }, 200);
    }

    public dropItem(): void {
      let possibleItemsArray: Item[] = Util.getInstance().level.possibleItemsArray;
      let randomItem: number = Util.getInstance().getRandomRange(0, possibleItemsArray.length);
      let item: Item = possibleItemsArray[randomItem];
      item.cmpTransform.local.translation = this.cmpTransform.local.translation;
      Util.getInstance().level.appendToRoot(item);
      Util.getInstance().level.itemArray.push(item);
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

    private lookAround(): void {
      if (this.currentLookAroundCooldown == this.lookAroundCooldown) {
        this.randomDirection();
        this.look(this.moveDirection);
        this.currentLookAroundCooldown = 0;
      } else {
        this.currentLookAroundCooldown ++;
      }
    }

    private randomDirection(): void {
      let randomnum: number = Util.getInstance().getRandomRange(1, 3);
      if (randomnum == 1) {
        this.moveDirection = DIRECTION.RIGHT;
      } else {
        this.moveDirection = DIRECTION.LEFT;
      }
    }

    private behavior = (_event: fudge.Eventƒ): void => {
      if (!this.isDead && this.isLoaded) {
        this.ki();
      }
    }
  }
}