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

      this.initialHealth = player.getStats().hp;
      document.getElementById("health").setAttribute("src", "../Game/Assets/health/heart" + this.initialHealth + ".png");

      this.initialWalkSpeed = player.getStats().walkSpeed;
      document.getElementById("speed").innerHTML = this.initialWalkSpeed.toString();

      this.initialJumpingPower = player.getStats().jumpHeight;
      document.getElementById("jumping").innerHTML = this.initialJumpingPower.toString();

      this.initialDamage = player.getStats().dmg;
      document.getElementById("damage").innerHTML = this.initialDamage.toString();

      this.initialAttackSpeed = player.getStats().attackSpeed;
      document.getElementById("attackSpeed").innerHTML = this.initialAttackSpeed.toString();
    }
  }
} 