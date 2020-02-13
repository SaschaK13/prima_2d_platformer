namespace Game {

  import fudge = FudgeCore;

  export enum EnvironmentType {
    PLATFORM = "Platform",
    BACKGROUND = "Background"
  }  

  export class Environment extends fudge.Node {
    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;
    public type: EnvironmentType
    //private static materials: fudge.Material;

    public spriteName: string;

    constructor(nodeName: string, type: String) {
      super(nodeName);
      this.type = this.parseStringToEnviornmentType(type);
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Environment.mesh);
      this.addComponent(cmpMesh);

      let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpTransform);
    } 

    //TODO adapt to environment
    public addSpriteListener(): void {
      for (let key of Util.getInstance().spritesMap.get(this.spriteName).keys()) {
        let sprite: Sprite = Util.getInstance().spritesMap.get(this.spriteName).get(key);
        let nodeSprite: NodeSprite = new NodeSprite(sprite.name, sprite);
        
        nodeSprite.activate(true);        
  
        nodeSprite.addEventListener(
          "showNext",
          (_event: Event) => { (<NodeSprite>_event.currentTarget).showFrameNext(); },
          true
        );
        this.appendChild(nodeSprite);
      }
    }

    private parseStringToEnviornmentType(s: String): EnvironmentType {
      switch (s) {
        case "Platform": {
          return EnvironmentType.PLATFORM;
        }
      }
    }
  }
}