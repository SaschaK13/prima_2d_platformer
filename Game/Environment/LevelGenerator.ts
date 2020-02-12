namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    root: fudge.Node;
    private data: Level;
    private levelObject: Level = new Level();

    constructor(root: fudge.Node) {
      this.root = root;
    }

    public async getDataFromFile() {
      let response: Response = await fetch("../Game/Assets/test.json");
      let offer: string = await response.text();
      this.data = JSON.parse(offer);
      this.generateLevel();
    }

    public generateLevel(): void {

      let value = this.data["player"];
      let player: Player = new Player(value.name, value.spriteName, value.positionX, value.positionY, value.scaleX, value.scaleY);
      this.levelObject.player = player;
      this.root.appendChild(player);

      let platformArray = this.data["platformArray"];
      for (var i: number = 0; i < platformArray.length; i++) {
        let current = platformArray[i];
        let platform: Platform = new Platform(current.name, current.type, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.root.appendChild(platform);
        this.levelObject.platformArray.push(platform);

      }

      let enemyArray = this.data["enemyArray"];
      for (var i: number = 0; i < enemyArray.length; i++) {
        let current = enemyArray[i];
        let enemy: Enemy = new Enemy(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.root.appendChild(enemy);
        this.levelObject.enemyArray.push(enemy);

      }

      let util = Util.getInstance();
      util.setCollidableObjects(this.root.getChildren());      
      util.level = this.levelObject;
      //fudge.Debug.log(this.levelObject.player);
    }
  }
}