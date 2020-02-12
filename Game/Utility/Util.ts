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
  }
}