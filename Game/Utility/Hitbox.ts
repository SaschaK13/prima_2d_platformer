namespace Game {

  import fudge = FudgeCore;

export class Hitbox extends fudge.Node
{
  private rectangle: fudge.Rectangle;
  private parentNode: Character
  private scaling: fudge.Vector2
  private currentDirection: DIRECTION;
  private static mesh: fudge.MeshQuad = new fudge.MeshQuad;


  constructor(nodeName: string, parentNode: Character, scaling: fudge.Vector2)
  {
    super(nodeName);
    this.parentNode = parentNode;
    this.scaling = scaling;
    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0.3, 1, 1, 1)));
    let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
    let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
    this.addComponent(new fudge.ComponentMaterial(material))
    this.addComponent(cmpMesh)
    this.addComponent(cmpTransform)
    this.currentDirection = DIRECTION.RIGHT

    this.cmpTransform.local.translation = parentNode.cmpTransform.local.translation;
    this.cmpTransform.local.scaling = this.scaling.toVector3()
    this.cmpTransform.local.translateX((parentNode.cmpTransform.local.scaling.x/2) + (this.cmpTransform.local.scaling.x/2))

    parentNode.appendChild(this)
  }

  public detectEnemys(): Character[]
  {
    let x = this.cmpTransform.local.translation.x
    let y = this.cmpTransform.local.translation.y
    let width = this.cmpTransform.local.scaling.x
    let height = this.cmpTransform.local.scaling.y
    this.rectangle = new fudge.Rectangle(x,y,width,height,fudge.ORIGIN2D.CENTER)
    let detectedEnemys: Character[] = []
    if(this.parentNode.constructor.name == "Enemy"){
      if(this.rectangle.isInside(Util.getInstance().player.cmpTransform.local.translation.toVector2()))
      {
        detectedEnemys.push(Util.getInstance().player):
        return detectedEnemys:
        
      }
    }else if(this.parentNode.constructor.name == "Player") {

      for(var i = 0; i < Util.getInstance().enemyArray.length; i++)
      {
        let enemy = Util.getInstance().enemyArray[i];
        if(this.rectangle.isInside(enemy.cmpTransform.local.translation.toVector2()))
        {
          detectedEnemys.push(enemy)
        }
      }

      return detectedEnemys;
    }

  }

}


}