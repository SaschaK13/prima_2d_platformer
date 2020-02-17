namespace Game {

import fudge = FudgeCore;

export class WizzardSpell extends Environment
{

  public name: string;
  public positionX: number;
  public positionY: number;
  public scaleX: number;
  public scaleY: number;

  private liefetime = 100;
  private currentLifetime = 0;
  public shotdirection = -1;

  constructor(name: string, type: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
    super(name, type);
    this.name = name;
    super.spriteName = spriteName;
    this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
    this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
    let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
    this.addComponent(new fudge.ComponentMaterial(material));
    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    super.addSpriteListener();

}

private behavior = (_event: fudge.Eventƒ): void => {
  let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
  if(this.currentLifetime == this.liefetime)
  {
    Util.getInstance().level.removeWizzardSpell(this);
    this.removeEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
  }else
    this.cmpTransform.local.translateX((5 * timeFrame) * this.shotdirection);
    this.currentLifetime++;
  }
}
}
}
