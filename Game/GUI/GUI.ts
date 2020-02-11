namespace Game {

  export class Gui {

    initialHealth: number = 5;
    initialWalkSpeed: number = 1;
    initialJumpingPower: number = 1;

    public updateHealth(damage: number): void {
      this.initialHealth = this.initialHealth - damage;
      document.getElementById("health").setAttribute("src", "../Game/Assets/herz" + this.initialHealth + ".png");
    }
    
    public updateWalkSpeed(speedFactor: number): void {
      this.initialWalkSpeed = this.initialWalkSpeed + speedFactor;
      document.getElementById("speed").innerHTML = "walk speed: " + this.initialWalkSpeed;
    }

    public updateJumpingPower(jumpingFactor: number): void {
      this.initialJumpingPower = this.initialJumpingPower + jumpingFactor;
      document.getElementById("jumping").innerHTML = "jumping power: " + this.initialJumpingPower;
    }
  }
} 