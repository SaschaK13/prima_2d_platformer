namespace Game {

  import fudge = FudgeCore;

  export class Goblin extends Character {
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
      this.isDead = true;
      this.showOneTime(CHARACTERSTATE.DEATH)

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

    public ki() {
      //Check if player is on same height
      let player = Util.getInstance().level.player;
      let playerTrans = Util.getInstance().level.player.cmpTransform.local.translation;
      let goblinTrans = this.cmpTransform.local.translation;
      let collisionObjects: Character[] = this.hitbox.detectEnemys() as Character[];
      if (collisionObjects.length != 0) {
        this.attack();
      } else {
        this.attacksPlayer = false;
      }

      if (goblinTrans.y <= playerTrans.y + 0.7 && goblinTrans.y >= playerTrans.y - 0.7) {
        //Same height
        if (this.currentPlatform && player.currentPlatform) {

          if (this.currentPlatform.name == player.currentPlatform.name && !this.attacksPlayer) {
            //Same platform
            if (playerTrans.x < goblinTrans.x) {
              //Player is LeftB
              this.walk(DIRECTION.LEFT);
            } else {
              //Player is Right
              this.walk(DIRECTION.RIGHT);
            }
          }
        }
      } else {
        this.show(CHARACTERSTATE.IDLE);
        this.lookAround();
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



    private lookAround() {
      if (this.currentLookAroundCooldown == this.lookAroundCooldown) {
        this.randomDirection()
        this.look(this.moveDirection)
        this.currentLookAroundCooldown = 0;
      }else{
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
      if(!this.isDead && this.isLoaded){
        this.ki()
      }
    }

  }
}