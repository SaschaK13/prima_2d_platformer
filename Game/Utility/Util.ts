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

    public attackSound: HTMLAudioElement;
    public selectSound: HTMLAudioElement;
    public pickUpSound: HTMLAudioElement;
    public jumpSound: HTMLAudioElement;
    public hurtSound: HTMLAudioElement;
    public themeSound: HTMLAudioElement;
    private data: Savegame;

    constructor() {}

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
      return Math.floor(Math.random() * (max - min) + min)
    }

    public gameOver(): void {
      let gameOver: HTMLElement = document.getElementById("gameOver");
      gameOver.style.visibility = "visible";
      let canvas: HTMLElement = document.getElementById("canvas");
      canvas.style.opacity = "0.5";
      let statBox: HTMLElement = document.getElementById("stats");
      statBox.style.opacity = "0.5";
    }

    public delay(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async  save(fileName: string): Promise<void> {
      let jsonString = this.createSavegame();
      let map: fudge.MapFilenameToContent = { [fileName]: jsonString };
      fudge.FileIoBrowserLocal.save(map);
    }
    
    
      public fetchAudios(): void {

      this.attackSound = new Audio();
      this.attackSound.src = "../Game/Assets/attack.wav";
      this.attackSound.load();

      this.selectSound = new Audio();
      this.selectSound.src = "../Game/Assets/select.wav";
      this.selectSound.load();

      this.pickUpSound = new Audio();
      this.pickUpSound.src = "../Game/Assets/pickUp.wav";
      this.pickUpSound.load();

      this.jumpSound = new Audio();
      this.jumpSound.src = "../Game/Assets/jump.wav";
      this.jumpSound.load();

      this.hurtSound = new Audio();
      this.hurtSound.src = "../Game/Assets/hurt.wav";
      this.hurtSound.load();

      this.themeSound = new Audio();
      this.themeSound.src = "../Game/Assets/theme.wav";
      this.themeSound.load();
    }

    private createSavegame(): string {
      return " {\"levelName\": \"" + this.level.levelName + "\", \"hp\": " + this.level.player.getStats().hp + " , \"dmg\": " + this.level.player.getStats().dmg + ", \"jumpHeight\": " + this.level.player.getStats().jumpHeight + ", \"walkSpeed\": " + this.level.player.getStats().walkSpeed + ", \"attackSpeed\":" + this.level.player.getStats().attackSpeed + " } "
    }

  


  }
}