namespace Game {

  import fudge = FudgeCore;

   export enum EnvironmentType{
    PLATFORM = "Platform"
   }  

  export class Environment extends fudge.Node {
    private static mesh: fudge.MeshQuad = new fudge.MeshQuad;
    public type: EnvironmentType
    //private static materials: fudge.Material;

    constructor(nodeName: string, type: String) {
      super(nodeName);
      this.type = this.parseStringToEnviornmentType(type)
      let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(Environment.mesh);
      this.addComponent(cmpMesh);

      let cmpTransform: fudge.ComponentTransform = new fudge.ComponentTransform();
      this.addComponent(cmpTransform);
    } 

    private parseStringToEnviornmentType(s: String): EnvironmentType
    {
      switch(s) {
        case "Platform":{
          return EnvironmentType.PLATFORM
        }
      }
        
    }
  }
}