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

    let node: fudge.Node = this.collissionObjects[i];
    fudge.Debug.log(node);
    if( node.name != this.object.name)
    {
      this.collideWith(node);
    }
  }  

  fudge.Debug.log(this.collissionObjects);


}

private collideWith(colissionObject: fudge.Node) {
  let colissionObjectPosition: fudge.Vector3 = colissionObject.cmpTransform.local.translation;
  let colissionObjectScaling: fudge.Vector3 = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

  let characterPosition: fudge.Vector3 = this.object.cmpTransform.local.translation;
  let characterScaling: fudge.Vector3 = (this.object.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

  if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
    characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
    characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
    characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
      this.isColliding = true;
      this.collissionObjects.push(colissionObject);
      fudge.Debug.log("collision!!")
    } else {
      this.isColliding = false;
      
    }
}

}



}