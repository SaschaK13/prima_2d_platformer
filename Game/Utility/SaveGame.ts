
namespace Game {

  import fudge = FudgeCore;

  export class Savegame {

    levelName: string;
    hp: number
    dmg: number
    jumpHeight: number
    walkSpeed: number
    attackSpeed: number


    constructor(levelName: string, hp: number, dmg: number, jumpHeight: number, walkSpeed: number, attackSpeed: number) {
      this.levelName = levelName;
      this.hp = hp;
      this.attackSpeed = attackSpeed;
      this.dmg = dmg;
      this.jumpHeight = jumpHeight;
      this.walkSpeed = walkSpeed;
    }

    public save() {
     

    }



  }


}