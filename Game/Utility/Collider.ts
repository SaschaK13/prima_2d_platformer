namespace Game {

import fudge = FudgeCore;

export interface CollidedObject {
    object: fudge.Node;
    collisionDirecton: CollisionDirection
}

export enum CollisionDirection {
  RIGHT = "Right",
  LEFT = "Left",
  TOP = "Top",
  BOTTOM = "Bottom"
}
export class Collider{

private object: Character;
private isColliding: boolean;
private collissionObjects: CollidedObject[];

constructor(node: Character) {
  this.object = node;
}




public handleCollsion() {

  let objects: fudge.Node[] = Util.getInstance().getCollidableObjects();
  this.collissionObjects = [];
  for(var i = 0; i < objects.length; i++) {

    let node: fudge.Node = objects[i];
    if( node.name != this.object.name)
    {
      this.collideWith(node);
    }
  }  


}

public getCollisionObjects(): CollidedObject[]
{
  
  return this.collissionObjects;
}

private collideWith(cObject: fudge.Node) {
 
  
    let colissionObjectPosition: fudge.Vector3 = cObject.cmpTransform.local.translation;
    let colissionObjectScaling: fudge.Vector3 = (cObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
  
    let characterPosition: fudge.Vector3 = this.object.cmpTransform.local.translation;
    let characterScaling: fudge.Vector3 = (this.object.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;
  
    if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
      characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
      characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
      characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
        this.isColliding = true;
        let direction = this.getCollisionDirection(cObject)
        fudge.Debug.log(direction)
        this.collissionObjects.push({object: cObject , collisionDirecton: direction});
      } else {
        this.isColliding = false;
        
      }
  

}


private getCollisionDirection(colissionObject: fudge.Node): CollisionDirection {
  let objectLeft = this.object.cmpTransform.local.translation.x - (this.object.cmpTransform.local.scaling.x/2) 
  let objectRight = this.object.cmpTransform.local.translation.x + (this.object.cmpTransform.local.scaling.x/2)
  let objectTop = this.object.cmpTransform.local.translation.y - (this.object.cmpTransform.local.scaling.y/2)
  let objectBottom = this.object.cmpTransform.local.translation.y + (this.object.cmpTransform.local.scaling.y/2)

  let objectOldLeft = this.object.oldTransform.x - (this.object.cmpTransform.local.scaling.x/2)
  let objectOldRight = this.object.oldTransform.x + (this.object.cmpTransform.local.scaling.x/2)
  let objectOldTop = this.object.oldTransform.y - (this.object.cmpTransform.local.scaling.y/2)
  let objectOldBottom = this.object.oldTransform.y + (this.object.cmpTransform.local.scaling.y/2)

  let collissionObjectLeft = colissionObject.cmpTransform.local.translation.x - (colissionObject.cmpTransform.local.scaling.x /2)
  let collissionObjectRight = colissionObject.cmpTransform.local.translation.x + (colissionObject.cmpTransform.local.scaling.x /2)
  let collissionObjectTop = colissionObject.cmpTransform.local.translation.y - (colissionObject.cmpTransform.local.scaling.y /2)
  let collissionObjectBottom = colissionObject.cmpTransform.local.translation.y + (colissionObject.cmpTransform.local.scaling.y /2)

  if(objectOldBottom < collissionObjectTop && objectBottom >= collissionObjectTop) return CollisionDirection.TOP
  if(objectOldTop >= collissionObjectBottom && objectTop < collissionObjectBottom) return CollisionDirection.BOTTOM
  if(objectOldRight < collissionObjectLeft && objectRight >= collissionObjectLeft) return CollisionDirection.LEFT
  if(objectOldLeft >= collissionObjectRight && objectLeft < collissionObjectRight) return CollisionDirection.RIGHT

  return null
  
}



}



}