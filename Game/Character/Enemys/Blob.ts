namespace Game {

  import fudge = FudgeCore;

  export class Blob extends Character {
    name: string;
    positionX: number;
    positionY: number;
    scaleX: number;
    scaleY: number;

    private movementDuration: number;
    private currentMovmentDuration: number = 0;
    private movedirection: DIRECTION;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
      // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
      // this.addComponent(new fudge.ComponentMaterial(material));

      this.setStats({ hp: 1, dmg: 0, walkSpeed: 1, jumpHeight: 0, attackSpeed: 0 });
      this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }


    public die(): void {
      this.dropItem();
      this.getParent().removeChild(this);
      Util.getInstance().level.deleteEnemy(this);
    }

    public ki(): void {
       if (this.currentMovmentDuration != this.movementDuration) {
        this.walk(this.movedirection);
        this.currentMovmentDuration++;
      } else {
        this.movementDuration = Util.getInstance().getRandomRange(100, 200);
        this.randomDirection();
        this.currentMovmentDuration = 0;
      }
    }

    public dropItem() {
      let possibleItemsArray: Item[] = Util.getInstance().level.possibleItemsArray;
      let randomItem: number = Util.getInstance().getRandomRange(0, possibleItemsArray.length);
      let item: Item = possibleItemsArray[randomItem];
      item.cmpTransform.local.translation = this.cmpTransform.local.translation;
      Util.getInstance().level.appendToRoot(item);
      Util.getInstance().level.itemArray.push(item);
    }

    private behavior = (_event: fudge.Eventƒ): void => {
      this.ki();
    }

    private randomDirection(): void {
      let randomnum: number = Util.getInstance().getRandomRange(1, 3);
      if (randomnum == 1) {
        this.movedirection = DIRECTION.RIGHT;
      } else {
        this.movedirection = DIRECTION.LEFT;
      }
    }
  }
}