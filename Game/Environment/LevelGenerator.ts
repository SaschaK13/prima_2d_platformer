namespace Game {

  import fudge = FudgeCore;
  
  export class LevelGenerator {

    public root: fudge.Node;
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
      let levelName: number = this.data["levelNumber"]; 
      this.levelObject.levelNumber = levelName;
      let levelLength: number = this.data["levelLength"];
      let backgroundValue: Background = this.data["background"];
      let numberOfBackground: number = Math.floor(levelLength / backgroundValue.length) + 2; //so the background will surely not end

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

      let playerValue: Player = this.data["player"];
      let player: Player = new Player(playerValue.name, playerValue.spriteName, playerValue.positionX, playerValue.positionY, playerValue.scaleX, playerValue.scaleY);
      Util.getInstance().gui.updateStats(player);
      player.isLoaded = true;
      this.root.appendChild(player);
      if(Util.getInstance().currentSavegame)
      {
        let savegame = Util.getInstance().currentSavegame;
        player.setStats({hp: savegame.hp, dmg: savegame.dmg, jumpHeight:savegame.jumpHeight, attackSpeed: savegame.attackSpeed, walkSpeed: savegame.walkSpeed })        
      } else if (Util.getInstance().oldPlayer) {
        let oldPlayerStats: CharacterStats = Util.getInstance().oldPlayer.getStats();
        player.setStats({hp: 10, dmg: oldPlayerStats.dmg, attackSpeed: oldPlayerStats.attackSpeed, jumpHeight: oldPlayerStats.jumpHeight, walkSpeed: oldPlayerStats.walkSpeed});
      }
      Util.getInstance().gui.updateStats(player)
      this.levelObject.player = player;

      let finishValue: Finish = this.data["finish"];
      let finish: Finish = new Finish(finishValue.name, finishValue.type, finishValue.spriteName);
      finish.cmpTransform.local.translateX(levelLength);
      this.levelObject.finish = finish;
      this.root.appendChild(finish);

      let theme: string = this.data["theme"];
      this.levelObject.theme = theme;

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
            let enemy: Blob = new Blob(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
            this.levelObject.enemyArray.push(enemy);
            break;
          } 

          case "goblin": {
            let enemy: Goblin = new Goblin(current.name, current.spriteName, current.positionX, current.positionY, current.scaleX, current.scaleY);
            this.levelObject.enemyArray.push(enemy);
            break;
          }

      }
    }
      let itemArray: Item[] = this.data["itemArray"];
      for (var i: number = 0; i < itemArray.length; i++) {
      let current: Item = itemArray[i];
      let item: Item = new Item(current.name, current.spriteName, current.hp, current.dmg, current.jumpHeight, current.walkSpeed, current.attackSpeed);
      this.levelObject.possibleItemsArray.push(item);

    }
      this.levelObject.setRoot(this.root);
      let util: Util = Util.getInstance();
      util.level = this.levelObject;
      Util.getInstance().setTheme(this.levelObject.theme);
      Util.getInstance().themeSound.play();
    }
  }
}
