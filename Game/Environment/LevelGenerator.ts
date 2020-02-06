namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    public async loadFile() {
      let response: Response = await fetch("../Game/Assets/test.json");
      let offer: string = await response.text();
      let data: Platform = JSON.parse(offer);

      fudge.Debug.log(data);
    }
  }
}