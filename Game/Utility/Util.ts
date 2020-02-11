namespace Game {

  import fudge = FudgeCore;

  export class Util {

    private static instance: Util;

    private collidableObjects: fudge.Node[];

    public player: Player;

    public enemyArray: Enemy[] = [];

    constructor() {}

    public static getInstance(): Util {
      if (!Util.instance) {
        Util.instance = new Util();
      }
      return Util.instance;
    }

    public getCollidableObjects(): fudge.Node[] {
      return this.collidableObjects;
    }

    public setCollidableObjects(array: fudge.Node[]): void  {
      this.collidableObjects = array;
    }

    public getTextureImageByName(name: string): fudge.TextureImage {
      let img: HTMLImageElement = document.querySelector("#" + name);
      let texture: fudge.TextureImage = new fudge.TextureImage();
      texture.image = img;
      return texture;
    }
  }



}