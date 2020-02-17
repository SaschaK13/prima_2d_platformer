namespace Game {

  import fudge = FudgeCore;

  export class Gui {

    public initialHealth: number = 0;
    public initialWalkSpeed: number = 0;
    public initialJumpingPower: number = 0;
    public initialDamage: number = 0;
    public initialAttackSpeed: number = 0;

    constructor() {}

    
    public updateStats(player: Character): void {

      this.initialHealth = Util.getInstance().numberToOneDecimal(player.getStats().hp);
      document.getElementById("health").setAttribute("src", "Assets/health/heart" + this.initialHealth + ".png");

      this.initialWalkSpeed = Util.getInstance().numberToOneDecimal(player.getStats().walkSpeed);
      document.getElementById("speed").innerHTML = this.initialWalkSpeed.toString();

      this.initialJumpingPower = Util.getInstance().numberToOneDecimal(player.getStats().jumpHeight);
      document.getElementById("jumping").innerHTML = this.initialJumpingPower.toString();

      this.initialDamage = Util.getInstance().numberToOneDecimal(player.getStats().dmg);
      document.getElementById("damage").innerHTML = this.initialDamage.toString();

      this.initialAttackSpeed = Util.getInstance().numberToOneDecimal(player.getStats().attackSpeed);
      document.getElementById("attackSpeed").innerHTML = this.initialAttackSpeed.toString();
    }
  }
} 