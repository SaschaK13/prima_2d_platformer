namespace Game {
  import fudge = FudgeCore;
  
  export class Level { 
    public levelNumber: number;
    public player: Player;
    public platformArray: Platform[] = [];
    public background: Background;
    public backgroundArray: Background[] = [];
    public enemyArray: Character[] = [];
    public itemArray: Item[] = [];
    public possibleItemsArray: Item[] = [];
    public theme: string;
    public finish: Finish;
    public wizzardSpells: WizzardSpell[] = [];
    private levelLength: number;
    private root: fudge.Node;

    public setRoot(root: fudge.Node): void {
      this.root = root;
    }

    public appendToRoot(node: fudge.Node): void {
      this.root.appendChild(node);
    }

    public deleteEnemy(enemy: Character): void {
      let newEnemyArray: Character[] = [];

      for (var i: number = 0; i < this.enemyArray.length; i++) {
        if (!(this.enemyArray[i].name == enemy.name)) {
          newEnemyArray.push(this.enemyArray[i]);
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

    public addWizardSpell(spell: WizzardSpell)
    {
      this.wizzardSpells.push(spell);
      this.root.appendChild(spell);
    }

    public removeWizzardSpell(spell: WizzardSpell)
    {
      let newSpellArray: WizzardSpell[] = [];

      for (var i: number = 0; i < this.wizzardSpells.length; i++) {
        if (!(this.wizzardSpells[i].name == spell.name)) {
          newSpellArray.push(this.wizzardSpells[i]);
        }
      }
      Util.getInstance().level.wizzardSpells = newSpellArray;
      this.root.removeChild(spell);
    }

    public getCollidableObjects(): fudge.Node[] {
      let collidableNodes: fudge.Node[] = [];
      for (var i: number = 0; i < this.platformArray.length; i++) {
        if (this.platformArray[i].isLoaded) {
          collidableNodes.push(this.platformArray[i]);
        }
      }

      for (var i: number = 0; i < this.enemyArray.length; i++) {
        if (this.enemyArray[i].isLoaded) {
        collidableNodes.push(this.enemyArray[i]);
        }
      }

      for (var i: number = 0; i < this.wizzardSpells.length; i++) {
        collidableNodes.push(this.wizzardSpells[i]);
      }

      for (var i = 0; i < this.itemArray.length; i++) {
        collidableNodes.push(this.itemArray[i]);
      }
      collidableNodes.push(this.player);
      collidableNodes.push(this.finish);

      return collidableNodes;
    }
  }
}