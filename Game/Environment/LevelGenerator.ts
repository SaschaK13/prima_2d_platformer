namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    private level: Level;

    public async getDataFromFile() {
      let response: Response = await fetch("../Game/Assets/test.json");
      let offer: string = await response.text();
      this.level = JSON.parse(offer);
      fudge.Debug.log(this.level.platformArray[0].name);
    }

    public generateLevel() {

      let platformArray = this.level.platformArray;
      for (var i = 0; i < platformArray.length; i++) {
        platformArray[i].instantiatePlatform();
      }
    }
  }
}