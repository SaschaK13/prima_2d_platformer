namespace Game {

  import fudge = FudgeCore;
  
  export class Character extends fudge.Node { 
      private mesh: fudge.MeshQuad;
      private transcmp: fudge.ComponentTransform;
      private materials: fudge.Material;
      private cmpMesh: fudge.ComponentMesh;
   
    constructor(nodeName: string) {
      super(nodeName);
      this.mesh = new fudge.MeshQuad();
      this.cmpMesh  = new fudge.ComponentMesh(this.mesh);
      this.addComponent(this.cmpMesh);

      this.transcmp = new fudge.ComponentTransform();
      this.addComponent(this.transcmp);
    }

    public collideWith(colissionObject: fudge.Node): boolean {
      let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
      let colissionObjectScaling = (colissionObject.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      let characterPosition = this.cmpTransform.local.translation;
      let CharacterScaling = (this.getComponent(fudge.ComponentMesh) as fudge.ComponentMesh).pivot.scaling;

      if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
        characterPosition.x + CharacterScaling.x > colissionObjectPosition.x &&
        characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
        characterPosition.y + CharacterScaling.y > colissionObjectPosition.y) {
          return true;
        }else 
        {
          return false;
        }

    }


 
  }
}