namespace Game {
  import fudge = FudgeCore;
  
  export class Level { 
    public player: Player;
    public platformArray: Platform[] = [];
    public enemyArray: Enemy[] = [];

    public deleteEnemy(enemy: Enemy){
      let newEnemyArray: Enemy[] = []

      for(var i = 0; i < this.enemyArray.length; i++)
      {
        if(!(this.enemyArray[i].name == enemy.name))
        {
          newEnemyArray.push(this.enemyArray[i])
        }
      }

      let colldableArray: fudge.Node[] = Util.getInstance().getCollidableObjects()
      let newCollidableArray: fudge.Node[] = []

      for(var i = 0; i < colldableArray.length; i++)
      {
        if(!(colldableArray[i].name == enemy.name))
        {
          newCollidableArray.push(colldableArray[i])
        }
      }

      Util.getInstance().setCollidableObjects(newCollidableArray);
      Util.getInstance().level.enemyArray = newEnemyArray;

    }
  }

 
}