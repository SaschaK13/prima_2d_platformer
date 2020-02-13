namespace Game {

  import fudge = FudgeCore;

  export class Util {

    private static instance: Util;

    public gui: Gui;
    public level: Level;
    public spritesMap: Map<string, Map<string, Sprite>>;


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

    public getRandomRange(min: number , max: number): number {
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
      return new Promise( resolve => setTimeout(resolve, ms) );
    }
  }
}