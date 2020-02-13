namespace Game {
  import fudge = FudgeCore;
  
  export class Level { 
    public player: Player;
    public platformArray: Platform[] = [];
    public enemyArray: Character[] = [];
    public itemArray: Item[] = [];
    public possibleItemsArray: Item[] = [];
    

    private root: fudge.Node;

    public setRoot(root: fudge.Node) {
      this.root = root;
    }

    public appendToRoot(node: fudge.Node) {
      this.root.appendChild(node);
    }

    public deleteEnemy(enemy: Character) {
      let newEnemyArray: Character[] = [];

      for(var i = 0; i < this.enemyArray.length; i++)
      {
        if(!(this.enemyArray[i].name == enemy.name))
        {
          newEnemyArray.push(this.enemyArray[i])
        }
      }

      Util.getInstance().level.enemyArray = newEnemyArray;
      
    }

    public deleteItem(item: Item): void {
      let newItemArray: Item[] = [];

      for (var i: number = 0; i < this.itemArray.length; i++) {
        if (!(this.itemArray[i].name == item.name)) {
          newItemArray.push(this.itemArray[i]);
        }
      }

      Util.getInstance().level.itemArray = newItemArray;

    }

    public getCollidableObjects(): fudge.Node[] {
      
      let collidableNodes: fudge.Node[] = [];

      for (var i: number = 0; i < this.platformArray.length; i++) {
        collidableNodes.push(this.platformArray[i]);
      }

      for (var i: number = 0; i < this.enemyArray.length; i++) {
        collidableNodes.push(this.enemyArray[i]);
      }

      fudge.Debug.log(this.itemArray.length);
      for (var i: number = 0; i < this.itemArray.length; i++) {
        collidableNodes.push(this.itemArray[i]);
      }

      collidableNodes.push(this.player)

      return collidableNodes;
    }
  }
}