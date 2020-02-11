namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    root: fudge.Node;
    private level: Level;
    private levelObject: Level = new Level();

    constructor(root: fudge.Node) {
      this.root = root;
    }

    public async getDataFromFile() {
      let response: Response = await fetch("../Game/Assets/test.json");
      let offer: string = await response.text();
      this.level = JSON.parse(offer);
      this.generateLevel();
    }

    public generateLevel(): void {

      let value = this.level["player"];
      let player: Player = new Player(value.name, value.positionX, value.positionY, value.scaleX, value.scaleY);
      this.levelObject.player = player;
      this.root.appendChild(player);

      let platformArray = this.level["platformArray"];
      for (var i: number = 0; i < platformArray.length; i++) {
        let current = platformArray[i];
        let platform: Platform = new Platform(current.name, current.type, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.levelObject.platformArray.push(platform);
        this.root.appendChild(platform);
      }

      let enemyArray = this.level["enemyArray"];
      for (var i: number = 0; i < enemyArray.length; i++) {
        let current = enemyArray[i];
        let enemy: Enemy = new Enemy(current.name, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.levelObject.enemyArray.push(enemy);
        this.root.appendChild(enemy);
      }

      let util = Util.getInstance();
      util.setCollidableObjects(this.root.getChildren());
      util.level.player = player;
      util.level.enemyArray = enemyArray;
      util.level.platformArray = platformArray;
    }
  }
}