namespace Game {

  import fudge = FudgeCore;

  export class Util {

    private static instance: Util;

    public gui: Gui;
    public level: Level;


    constructor() {}

    public static getInstance(): Util {
      if (!Util.instance) {
        Util.instance = new Util();
      }
      return Util.instance;
    }
    
    public getTextureImageByName(name: string): fudge.TextureImage {
      let img: HTMLImageElement = document.querySelector("#" + name);
      let texture: fudge.TextureImage = new fudge.TextureImage();
      texture.image = img;     
      return texture;
    }
  }



}