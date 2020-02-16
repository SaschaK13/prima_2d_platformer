namespace Game {

  import fudge = FudgeCore;

  export class Blob extends Character {
    public name: string;
    public positionX: number;
    public positionY: number;
    public scaleX: number;
    public scaleY: number;

    private dropChance: number = 0.2;
    private movementDuration: number;
    private currentMovmentDuration: number = 0;
    private moveDirection: DIRECTION;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      
      this.setStats({ hp: 3, dmg: 0, walkSpeed: 1, jumpHeight: 0, attackSpeed: 0 });
      this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }


    public die(): void {
      if (Math.random() < this.dropChance) {
        this.dropItem();
      }
      this.isDead = true;
      this.showOneTime(CHARACTERSTATE.DEATH);

      setTimeout(() => { 
        this.getParent().removeChild(this);
        Util.getInstance().level.deleteEnemy(this);
       }, 500);
    }

    public dropItem(): void {
      let possibleItemsArray: Item[] = Util.getInstance().level.possibleItemsArray;
      let randomItem: number = Util.getInstance().getRandomRange(0, possibleItemsArray.length);
      let item: Item = possibleItemsArray[randomItem];
      item.cmpTransform.local.translation = this.cmpTransform.local.translation;
      Util.getInstance().level.appendToRoot(item);
      Util.getInstance().level.itemArray.push(item);
    }

    public ki(): void {
       if (this.currentMovmentDuration != this.movementDuration) {
        if(this.cmpTransform.local.translation.x >= this.currentPlatform.cmpTransform.local.translation.x - (this.currentPlatform.cmpTransform.local.scaling.x / 2) && this.cmpTransform.local.translation.x <= this.currentPlatform.cmpTransform.local.translation.x + (this.currentPlatform.cmpTransform.local.scaling.x / 2))
        {
          this.walk(this.moveDirection);
          
        }else{
          switch(this.moveDirection){
            case DIRECTION.LEFT: {
              this.moveDirection = DIRECTION.RIGHT;
              this.walk(this.moveDirection);
              break;
            }
            case DIRECTION.RIGHT: {
              this.moveDirection = DIRECTION.LEFT;
              this.walk(this.moveDirection);
              break;
            }

          }
          this.currentMovmentDuration++;
        }
        
      } else {
        this.movementDuration = Util.getInstance().getRandomRange(100, 200);
        this.randomDirection();
        this.currentMovmentDuration = 0;
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

    private behavior = (_event: fudge.Eventƒ): void => {
      if(!this.isDead)
      {
        this.ki();

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
  }
}