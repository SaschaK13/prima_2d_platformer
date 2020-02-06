namespace Game {

  import fudge = FudgeCore;

  export class Platform extends Environment {
    name: string;
    constructor(nodeName: string) {
      super(nodeName);
    }
  }
}