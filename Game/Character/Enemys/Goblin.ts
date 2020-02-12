namespace Game {

  import fudge = FudgeCore;

  export class Goblin extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;

    lookAroundCooldown = 50;
    currentLookAroundCooldown = 0;
    moveDirection: DIRECTION = DIRECTION.RIGHT;


    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);


      this.setStat({ hp: 3, dmg: 0, walk_speed: 2, jump_height: 0, attackspeed: 0 });

      //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      //this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }


    public die(): void {
      this.getParent().removeChild(this);
      Util.getInstance().level.deleteEnemy(this);
    }

    public ki() {
      //Check if player is on same height
      let player = Util.getInstance().level.player;
      let playerTrans = Util.getInstance().level.player.cmpTransform.local.translation;
      let goblinTrans = this.cmpTransform.local.translation;

      if (goblinTrans.y <= playerTrans.y + 1 && goblinTrans.y >= playerTrans.y - 1) {
        //Same height
        if (this.currentPlatform && player.currentPlatform) {

          if (this.currentPlatform.name == player.currentPlatform.name) {
            //Same platform
            if (playerTrans.x < goblinTrans.x) {
              //Player is LeftB
              this.walk(DIRECTION.LEFT)
            } else {
              //Player is Right
              this.walk(DIRECTION.RIGHT)
            }
          }
        }
      } else {
        this.lookAround();
      }
    }


    public lookAround() {
      if (this.currentLookAroundCooldown == this.lookAroundCooldown) {
        this.randomDirection()
        this.walk(this.moveDirection);
        this.currentLookAroundCooldown = 0;
      }else{
        this.currentLookAroundCooldown ++;
      }
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();

      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];

        switch (collisionObject.collisionType) {
          case CollisionType.ENEMY: {

            break;
          }

          case CollisionType.ENVIRONMENT: {
            if (collisionObject.object.constructor.name == "Platform") {
              this.currentPlatform = collisionObject.object as Platform;
            }
            this.handleSolidColision(collisionObject);
            break;
          }

          case CollisionType.PLAYER: {
            this.handleSolidColision(collisionObject);
            break;
          }
        }
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
      this.ki()
    }

  }
}