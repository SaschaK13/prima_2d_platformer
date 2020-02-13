namespace Game {

  import fudge = FudgeCore;

  export class ItemGenerator {
    
    private data: Item;
    private itemObject: Item = new Level();

    constructor(root: fudge.Node) {
      this.root = root;
    }

  }

}