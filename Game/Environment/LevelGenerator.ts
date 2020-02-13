namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    root: fudge.Node;
    private data: Level;
    private levelObject: Level = new Level();

    private backgroundLength: number = 15;

    constructor(root: fudge.Node) {
      this.root = root;
    }

    public async getDataFromFile(levelName: string) {
      let response: Response = await fetch("../Game/Assets/level/" + levelName + ".json");
      let offer: string = await response.text();
      this.data = JSON.parse(offer);
      this.generateLevel();
    }

    public generateLevel(): void {
      let levelName: string = this.data["levelName"]; 
      this.levelObject.levelName = levelName;
      let levelLength: number = this.data["levelLength"];
      let backgroundValue: Background = this.data["background"];
      let numberOfBackground: number = Math.round(levelLength / backgroundValue.length);

      for (var i: number = 0; i < numberOfBackground; i++) {
        let background: Background = new Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
        background.cmpTransform.local.translation = new fudge.Vector3(i * this.backgroundLength, 0, -1);
        //this.root.appendChild(background);
        this.levelObject.backgroundArray.push(background);
      }
      //background left
      let background: Background = new Background(backgroundValue.name, backgroundValue.type, backgroundValue.spriteName, backgroundValue.length);
      background.cmpTransform.local.translation = new fudge.Vector3(-15, 0, -1);
      this.root.appendChild(background);
      this.levelObject.backgroundArray.push(background);

      fudge.Debug.log(this.levelObject.backgroundArray);

      let playerValue = this.data["player"];
      let player: Player = new Player(playerValue.name, playerValue.spriteName, playerValue.positionX, playerValue.positionY, playerValue.scaleX, playerValue.scaleY);
      this.levelObject.player = player;
      player.isLoaded= true;
      this.root.appendChild(player);

      let platformArray = this.data["platformArray"];
      for (var i: number = 0; i < platformArray.length; i++) {
        let current = platformArray[i];
        let platform: Platform = new Platform(current.name, current.type, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
        this.levelObject.platformArray.push(platform);
      }

      let enemyArray = this.data["enemyArray"]
      for (var i: number = 0; i < enemyArray.length; i++) {
        let current = enemyArray[i];
        switch (current.spriteName) {
          case "blob": {
            let enemy: Blob = new Blob(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleX);
            this.levelObject.enemyArray.push(enemy);
            break;
          } 

          case "goblin": {
            let enemy: Goblin = new Goblin(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleX);
            this.levelObject.enemyArray.push(enemy);
            break;
          }

      }
    }

      let itemArray = this.data["itemArray"];
      for (var i: number = 0; i < itemArray.length; i++) {
      let current = itemArray[i];
      let item: Item = new Item(current.name, current.spriteName, current.hp, current.dmg, current.jumpHeight, current.walkSpeed, current.attackSpeed);
      this.levelObject.possibleItemsArray.push(item);
      fudge.Debug.log(this.levelObject.possibleItemsArray);
    }

      this.levelObject.setRoot(this.root);
      let util = Util.getInstance();
      util.level = this.levelObject;
      Util.getInstance().save()

    }


  }
}
