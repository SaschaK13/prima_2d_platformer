namespace Game {
  import fudge = FudgeCore;
  
  export class Level { 
    public player: Player;
    public platformArray: Platform[] = [];
    public enemyArray: Character[] = [];



    public deleteEnemy(enemy: Character){
      let newEnemyArray: Character[] = []

      for(var i = 0; i < this.enemyArray.length; i++)
      {
        if(!(this.enemyArray[i].name == enemy.name))
        {
          newEnemyArray.push(this.enemyArray[i])
        }
      }

      Util.getInstance().level.enemyArray = newEnemyArray;

    }

    public getCollidableObjects(): fudge.Node[] {
      
      let collidableNodes: fudge.Node[] = []

      for(var i = 0; i < this.platformArray.length; i++)
      {
        collidableNodes.push(this.platformArray[i])
      }

      for(var i = 0; i < this.enemyArray.length; i++)
      {
        collidableNodes.push(this.enemyArray[i])
      }

      collidableNodes.push(this.player)

      return collidableNodes
    }
  }

 
}