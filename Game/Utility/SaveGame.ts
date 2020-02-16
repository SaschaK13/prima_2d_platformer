namespace Game {

  import fudge = FudgeCore;

  export class Savegame {
    public levelName: string;
    public hp: number;
    public dmg: number;
    public jumpHeight: number;
    public walkSpeed: number;
    public attackSpeed: number;

    constructor(levelName: string, hp: number, dmg: number, jumpHeight: number, walkSpeed: number, attackSpeed: number) {
      this.levelName = levelName;
      this.hp = hp;
      this.attackSpeed = attackSpeed;
      this.dmg = dmg;
      this.jumpHeight = jumpHeight;
      this.walkSpeed = walkSpeed;
    }
  }
}