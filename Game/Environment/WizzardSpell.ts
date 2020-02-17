namespace Game {

import fudge = FudgeCore;

export class WizzardSpell extends Environment {
  public name: string;
  public positionX: number;
  public positionY: number;
  public scaleX: number;
  public scaleY: number;

  private liefetime: number = 150;
  private currentLifetime: number = 0;
  public shotdirection: number = -1;

  constructor(name: string, type: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
    super(name, type);
    this.name = name;
    super.spriteName = spriteName;
    this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
    this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);

    fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    super.addSpriteListener();

  }

  private behavior = (_event: fudge.Eventƒ): void => {
    let timeFrame: number = fudge.Loop.timeFrameGame / 1000;
    if (this.currentLifetime == this.liefetime) {
      Util.getInstance().level.removeWizzardSpell(this);
      this.removeEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    } else {
      this.cmpTransform.local.translateX((7 * timeFrame) * this.shotdirection);
      this.currentLifetime++;
    }
  }
}
}
