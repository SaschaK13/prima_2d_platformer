namespace Game {

  import fudge = FudgeCore;

  export class Util {

    private static instance: Util;

    private collidableObjects: fudge.Node[];

    public player: Player;

    public level: Level;

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

    


  


  }



}