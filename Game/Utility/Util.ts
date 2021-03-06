
namespace Game {

  import fudge = FudgeCore;

  export class Util {

    private static instance: Util;

    public gui: Gui;
    public level: Level;
    public spritesMap: Map<string, Map<string, Sprite>>;
    public currentSavegame: Savegame;
    public collidableNode: fudge.Node;
    public lvlGenerator: LevelGenerator;
    public rootNode: fudge.Node;
    public attackSound: HTMLAudioElement;
    public selectSound: HTMLAudioElement;
    public pickUpSound: HTMLAudioElement;
    public jumpSound: HTMLAudioElement;
    public hurtSound: HTMLAudioElement;
    public themeSound: HTMLAudioElement;
    public currentLVLNumber: number;
    public oldPlayer: Character;

    public musicVol: number;
    public soundVol: number;

    constructor() { }

    public static getInstance(): Util {
      if (!Util.instance) {
        Util.instance = new Util();
      }
      return Util.instance;
    }


    public getTextureImageBy(name: string, state: string): fudge.TextureImage {
      let img: HTMLImageElement = document.querySelector("#" + name + "_" + state);
      let texture: fudge.TextureImage = new fudge.TextureImage();
      texture.image = img;
      return texture;
    }

    public getRandomRange(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min) + min);
    }

    public gameOver(): void {
      let gameOver: HTMLElement = document.getElementById("gameOver");
      gameOver.style.visibility = "visible";
      let canvas: HTMLElement = document.getElementById("canvas");
      canvas.style.opacity = "0.5";
      let statBox: HTMLElement = document.getElementById("stats");
      statBox.style.opacity = "0.5";
    }

    public delay(ms: number): Promise<unknown> {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async save(fileName: string): Promise<void> {
      let jsonString: string = this.createSavegame();
      let map: fudge.MapFilenameToContent = { [fileName]: jsonString };
      fudge.FileIoBrowserLocal.save(map);
    }

    public fetchAudios(): void {

      this.attackSound = new Audio();
      this.attackSound.src = "../Game/Assets/sounds/attack.wav";
      this.attackSound.load();

      this.selectSound = new Audio();
      this.selectSound.src = "../Game/Assets/sounds/select.wav";
      this.selectSound.load();

      this.pickUpSound = new Audio();
      this.pickUpSound.src = "../Game/Assets/sounds/pickUp.wav";
      this.pickUpSound.load();

      this.jumpSound = new Audio();
      this.jumpSound.src = "../Game/Assets/sounds/jump.wav";
      this.jumpSound.load();

      this.hurtSound = new Audio();
      this.hurtSound.src = "../Game/Assets/sounds/hurt.wav";
      this.hurtSound.load();
    }

    public setTheme(theme: String): void {
      fudge.Debug.log(theme);
      this.themeSound = new Audio();
      switch (theme) {
        case "level1": {
          this.themeSound.src = "../Game/Assets/sounds/level1.wav";
          break;
        }
        case "level2": {
          this.themeSound.src = "../Game/Assets/sounds/level2.wav";
          break;
        }
        case "level3": {
          this.themeSound.src = "../Game/Assets/sounds/level3.wav";
          break;
        }
        case "level4": {
          this.themeSound.src = "../Game/Assets/sounds/level4.wav";
          break;
        }
      }
      this.themeSound.loop = true;
      this.themeSound.load();

      this.setVolume(this.musicVol, this.soundVol);
    }

    public loadNextLevel(): void {
      this.themeSound.pause();
      this.oldPlayer = this.level.player;
      this.deleteAllNodes();
      this.collidableNode = new fudge.Node("Colidable");
      this.lvlGenerator = new LevelGenerator(this.collidableNode);
      this.rootNode.appendChild(this.collidableNode);
      if (!(this.currentLVLNumber == 4)) {
        this.lvlGenerator.getDataFromFile("level" + (this.currentLVLNumber + 1));
      } else {
        window.open("endscreen", "_self" , "fullscreen=yes" , true); 
      }
    }

    public setVolume(musicVol: number, soundVol: number): void {
      this.themeSound.volume = this.numberToOneDecimal(musicVol);
      this.hurtSound.volume = this.numberToOneDecimal(soundVol);
      this.jumpSound.volume = this.numberToOneDecimal(soundVol);
      this.pickUpSound.volume = this.numberToOneDecimal(soundVol);
      this.selectSound.volume = this.numberToOneDecimal(soundVol);
      this.attackSound.volume = this.numberToOneDecimal(soundVol);
    }

    public numberToOneDecimal(number: number): number {
      return Math.round(number * 10) / 10;
    }

    private createSavegame(): string {
      return " {\"levelName\": \"level" + (this.level.levelNumber + 1) + "\", \"hp\": " + this.level.player.getStats().hp + " , \"dmg\": " + this.level.player.getStats().dmg + ", \"jumpHeight\": " + this.level.player.getStats().jumpHeight + ", \"walkSpeed\": " + this.level.player.getStats().walkSpeed + ", \"attackSpeed\":" + this.level.player.getStats().attackSpeed + " } "
    }

    private deleteAllNodes(): void {
      let childs: fudge.Node[] = this.collidableNode.getChildren();

      for (var i: number = 0; i < childs.length; i++) {
        this.collidableNode.removeChild(childs[i]);
      }
      this.collidableNode.getParent().removeChild(this.collidableNode);

      for (var i: number = 0; i < this.level.enemyArray.length; i++) {
        let enemy: Character = this.level.enemyArray[i];
        for (var j: number = 0; j < enemy.getChildren().length; j++) {
          let child: fudge.Node = enemy.getChildren()[j];
          enemy.removeChild(child);
        }
      }
      this.lvlGenerator = null;
      this.currentLVLNumber = this.level.levelNumber;
      this.level = null;
    }
  }
}