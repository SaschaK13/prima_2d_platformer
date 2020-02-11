namespace Game {

  import fudge = FudgeCore;

  export class Hitbox extends fudge.Node {
    private rectangle: fudge.Rectangle;
    private parentNode: Character
    private scaling: fudge.Vector2
    private currentDirection: DIRECTION;
    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;


    constructor(nodeName: string, parentNode: Character, scaling: fudge.Vector2) {
      super(nodeName);
      this.parentNode = parentNode;
      this.scaling = scaling;
      let cmpMesh = new fudge.ComponentMesh(Hitbox.mesh);
      let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpMesh)
      this.addComponent(cmpTransform)
      this.currentDirection = DIRECTION.RIGHT

      this.cmpTransform.local.translation = parentNode.cmpTransform.local.translation;
      this.cmpTransform.local.scaling = this.scaling.toVector3()
      this.cmpTransform.local.translateX((parentNode.cmpTransform.local.scaling.x / 2) + (this.cmpTransform.local.scaling.x / 2))

      parentNode.appendChild(this)
    }

    public detectEnemys(): Character[] {
      let x = this.mtxWorld.translation.x
      let y = this.mtxWorld.translation.y
      let width = this.cmpTransform.local.scaling.x
      let height = this.cmpTransform.local.scaling.y
      this.rectangle = new fudge.Rectangle(x, y, width, height, fudge.ORIGIN2D.CENTER)

      let detectedEnemys: Character[] = []
      if (this.parentNode.constructor.name == "Enemy") {
        if (this.collideWith(Util.getInstance().level.player)) {
          detectedEnemys.push(Util.getInstance().level.player);
          return detectedEnemys;

        }
      } else if (this.parentNode.constructor.name == "Player") {

        for (var i = 0; i < Util.getInstance().level.enemyArray.length; i++) {
          let enemy = Util.getInstance().level.enemyArray[i];
          if (this.collideWith(enemy)) {
            detectedEnemys.push(enemy)
          }
          return detectedEnemys;
        }

      }

    }

    private collideWith(cObject: Character): boolean {
      let colissionObjectPosition: fudge.Vector3 = cObject.cmpTransform.local.translation;
      let colissionObjectScaling: fudge.Vector3 = cObject.cmpTransform.local.scaling;

      let characterPosition: fudge.Vector3 = this.mtxWorld.translation
      let characterScaling: fudge.Vector3 = this.cmpTransform.local.scaling;

      if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
        characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
        characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
        characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {

        return true

      } else {

        return false

      }


    }

  }


}