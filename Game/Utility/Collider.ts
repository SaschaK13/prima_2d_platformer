namespace Game {

import fudge = FudgeCore;

export class Collider{

private object: fudge.Node;
private isColliding: boolean;
private collissionObjects: fudge.Node[];

constructor(node: fudge.Node) {
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

public getCollisionObjects(): fudge.Node[]
{
  
  return this.collissionObjects;
}

private collideWith(colissionObject: fudge.Node) {
  let colissionObjectPosition: fudge.Vector3 = colissionObject.cmpTransform.local.translation;
  let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

  let characterPosition: fudge.Vector3 = this.object.cmpTransform.local.translation;
  let characterScaling: fudge.Vector3 = (this.object.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

  if (characterPosition.x - (characterScaling.x /2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
  characterPosition.x + (characterScaling.x/2) > colissionObjectPosition.x - (colissionObjectScaling.x /2) &&
  characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y/2) &&
  characterPosition.y + (characterScaling.y /2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2)) {
      this.isColliding = true;
      this.collissionObjects.push(colissionObject);
    } else {
      this.isColliding = false;
      
    }
}

}



}