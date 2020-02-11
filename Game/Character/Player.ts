namespace Game {

  import fudge = FudgeCore;
  export class Player extends Character {
    constructor(nodeName: string) {
      super(nodeName);
    }

    //Cooldown
    attack()
    {
      let detectedEnemys: Enemy[] = this.hitbox.detectEnemys();
      for(var i = 0; i < detectedEnemys.length; i++)
      {
        detectedEnemys[i].takeDmg(this.getStats().dmg)
        fudge.Debug.log(detectedEnemys[i].getStats().hp)
      }
    }
  }
}
