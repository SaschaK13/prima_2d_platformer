namespace Game {

  import fudge = FudgeCore;

  export class Gui {

    initialHealth: number = 10;
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

    public updateHealth(character: Character): void {
      this.initialHealth = character.getStats().hp
      document.getElementById("health").setAttribute("src", "../Game/Assets/health/heart" + this.initialHealth + ".png");
    }
    
    public updateWalkSpeed(speedFactor: number): void {
      this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
      document.getElementById("speed").innerHTML = this.initialWalkSpeed.toString();
    }

    public updateJumpingPower(jumpingFactor: number): void {
      this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
      document.getElementById("jumping").innerHTML = this.initialJumpingPower.toString();
    }

    public updateDamage(damageFactor: number): void {
      this.initialDamage = this.initialDamage + damageFactor;
      document.getElementById("damage").innerHTML = this.initialDamage.toString();
    }

    public updatAttackSpeed(attackSpeedFactor: number): void {
      this.initialAttackSpeed = this.initialAttackSpeed + attackSpeedFactor;
      document.getElementById("attackSpeed").innerHTML = this.initialAttackSpeed.toString();
    }
  }
} 