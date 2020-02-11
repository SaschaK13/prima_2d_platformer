namespace Game {
  import fudge = FudgeCore;
  
  export class Level { 
    public player: Player;
    public platformArray: Platform[] = [];
    public enemyArray: Enemy[] = [];
  }
}