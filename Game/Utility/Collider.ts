namespace Game {

import fudge = FudgeCore;

export interface CollidedObject {
    object: fudge.Node;
    collisionDirecton: COLLISIONDIRECTION;
    collisionType: COLLISIONTYPE;
}

export enum COLLISIONTYPE{
  ENVIRONMENT = "Environment", 
  ENEMY = "Enemy",
  PLAYER = "Player",
  ITEM = "Item",
  FINISH = "Finish",
  MISSING = "Missing"
}
export enum COLLISIONDIRECTION {
  RIGHT = "Right",
  LEFT = "Left",
  TOP = "Top",
  BOTTOM = "Bottom",
  ERROR = "Error"
}
export class Collider{

private object: Character;
private collissionObjects: CollidedObject[];
private oldCollisionObjects: CollidedObject[];

constructor(node: Character) {
  this.object = node;
}


public handleCollsion() {

  let objects: fudge.Node[] = Util.getInstance().level.getCollidableObjects();
  this.oldCollisionObjects = this.collissionObjects;
  this.collissionObjects = [];
  for (var i = 0; i < objects.length; i++) {
        let node: fudge.Node = objects[i];
        if (node.name != this.object.name) {
          this.collideWith(node);
        }
      }
  this.updateCollisionObjects();

  
}

public getCollisionObjects(): CollidedObject[]
{
  return this.collissionObjects;
}

private getCollisionDirection(colissionObject: fudge.Node): COLLISIONDIRECTION {
  let objectLeft = this.object.cmpTransform.local.translation.x - (this.object.cmpTransform.local.scaling.x / 2);
  let objectRight = this.object.cmpTransform.local.translation.x + (this.object.cmpTransform.local.scaling.x / 2);
  let objectTop = this.object.cmpTransform.local.translation.y - (this.object.cmpTransform.local.scaling.y / 2);
  let objectBottom = this.object.cmpTransform.local.translation.y + (this.object.cmpTransform.local.scaling.y / 2);

  let objectOldLeft = this.object.oldTransform.x - (this.object.cmpTransform.local.scaling.x / 2);
  let objectOldRight = this.object.oldTransform.x + (this.object.cmpTransform.local.scaling.x / 2);
  let objectOldTop = this.object.oldTransform.y - (this.object.cmpTransform.local.scaling.y / 2);
  let objectOldBottom = this.object.oldTransform.y + (this.object.cmpTransform.local.scaling.y / 2);

  let collissionObjectLeft = colissionObject.cmpTransform.local.translation.x - (colissionObject.cmpTransform.local.scaling.x / 2);
  let collissionObjectRight = colissionObject.cmpTransform.local.translation.x + (colissionObject.cmpTransform.local.scaling.x / 2);
  let collissionObjectTop = colissionObject.cmpTransform.local.translation.y - (colissionObject.cmpTransform.local.scaling.y / 2);
  let collissionObjectBottom = colissionObject.cmpTransform.local.translation.y + (colissionObject.cmpTransform.local.scaling.y / 2);

  if (objectOldBottom <= collissionObjectTop && objectBottom >= collissionObjectTop) return COLLISIONDIRECTION.TOP;
  if (objectOldTop >= collissionObjectBottom && objectTop <= collissionObjectBottom) return COLLISIONDIRECTION.BOTTOM;
  if (objectOldRight <= collissionObjectLeft && objectRight >= collissionObjectLeft) return COLLISIONDIRECTION.RIGHT;
  if (objectOldLeft >= collissionObjectRight && objectLeft <= collissionObjectRight) return COLLISIONDIRECTION.LEFT;

  return COLLISIONDIRECTION.ERROR

}

private collideWith(cObject: fudge.Node) {


    let colissionObjectPosition: fudge.Vector3 = cObject.cmpTransform.local.translation;
    let colissionObjectScaling: fudge.Vector3 = cObject.cmpTransform.local.scaling;

    let characterPosition: fudge.Vector3 = this.object.cmpTransform.local.translation;
    let characterScaling: fudge.Vector3 = this.object.cmpTransform.local.scaling;

    if (characterPosition.x - (characterScaling.x / 2) < colissionObjectPosition.x + (colissionObjectScaling.x / 2) &&
    characterPosition.x + (characterScaling.x / 2) > colissionObjectPosition.x - (colissionObjectScaling.x / 2) &&
    characterPosition.y - (characterScaling.y / 2) < colissionObjectPosition.y + (colissionObjectScaling.y / 2) &&
    characterPosition.y + (characterScaling.y / 2) > colissionObjectPosition.y - (colissionObjectScaling.y / 2))  {
        let direction = this.getCollisionDirection(cObject)
        let collisionType = this.getCollisionType(cObject)
        this.collissionObjects.push({object: cObject , collisionDirecton: direction, collisionType: collisionType});
      } else {

      }
}

private updateCollisionObjects()
{
  for(var i = 0; i < this.oldCollisionObjects.length; i++)
  {
    let oldObject = this.oldCollisionObjects[i];
    for(var j = 0; j < this.collissionObjects.length; j++)
    {
      let newObject = this.collissionObjects[j]
      if(oldObject.object.name ==  newObject.object.name)
      {
        if(newObject.collisionDirecton == COLLISIONDIRECTION.ERROR)
        {
          newObject.collisionDirecton = oldObject.collisionDirecton
        }
      }
    }

  }
}

private getCollisionType(colissionObject: fudge.Node): COLLISIONTYPE {
  switch(colissionObject.constructor.name) {

    case "Platform": {
      return COLLISIONTYPE.ENVIRONMENT;
    }

    case"Blob": {
     
      return COLLISIONTYPE.ENEMY;
    }

    case"Goblin": {
     
      return COLLISIONTYPE.ENEMY;
    }
 
    case "Player": {
      return COLLISIONTYPE.PLAYER;
    }

    case "Item": {
      return COLLISIONTYPE.ITEM;
    }

    case "Finish": {
      return COLLISIONTYPE.FINISH;
    }
  }
}

}



}
