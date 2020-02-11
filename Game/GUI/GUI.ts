namespace Game {

  import fudge = FudgeCore;

  export class Gui {

    initialHealth: number = 5;
    initialWalkSpeed: number;
    initialJumpingPower: number;
    initialDamage: number;
    initialAttackSpeed: number;

    constructor(initialWalkSpeed: number, initialJumpingPower: number, initialDamage: number, initialAttackSpeed: number) {
      this.initialWalkSpeed = initialWalkSpeed;
      this.initialJumpingPower = initialJumpingPower;
      this.initialDamage = initialDamage;
      this.initialAttackSpeed = initialAttackSpeed;
    }

    public updateHealth(damageAndHeal: number): void {
      fudge.Debug.log("i am in ");
      this.initialHealth = this.initialHealth - damageAndHeal;
      document.getElementById("health").setAttribute("src", "../Game/Assets/herz" + this.initialHealth + ".png");
      fudge.Debug.log(this.initialHealth);
    }
    
    public updateWalkSpeed(speedFactor: number): void {
      this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
      document.getElementById("speed").innerHTML = "walk speed: " + this.initialWalkSpeed;
    }

    public updateJumpingPower(jumpingFactor: number): void {
      this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
      document.getElementById("jumping").innerHTML = "jumping power: " + this.initialJumpingPower;
    }

    public updateDamage(damageFactor: number): void {
      this.initialDamage = this.initialDamage + damageFactor;
      document.getElementById("damage").innerHTML = "damage: " + this.initialDamage;
    }

    public updatAttackSpeed(attackSpeedFactor: number): void {
      this.initialAttackSpeed = this.initialAttackSpeed + attackSpeedFactor;
      document.getElementById("attackSpeed").innerHTML = "attack speed: " + this.initialAttackSpeed;
    }
  }
} 