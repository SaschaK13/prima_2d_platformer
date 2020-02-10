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
      let platformArray = this.level["platformArray"];
      for (var i: number = 0; i < platformArray.length; i++) {
        let current = platformArray[i];
        let platform: Platform = new Platform(current.name, current.type, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.levelObject.platformArray.push(platform);
        this.root.appendChild(platform);
      }
      let util = Util.getInstance();
      util.setCollidableObjects(this.root.getChildren());
    }
  }
}