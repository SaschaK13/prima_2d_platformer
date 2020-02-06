namespace Game {

  import fudge = FudgeCore;

  export class Platform extends Environment {
    name: string;
    type: string;

    constructor() {
      super(name);
    }

    //TODO platform data objekt
    public instantiatePlatform() {
      this.cmpTransform.local.scaleY(2);
    }
  }
}