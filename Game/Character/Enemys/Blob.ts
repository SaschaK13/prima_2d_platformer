namespace Game {

import fudge = FudgeCore;

export class Blob extends Enemy{


constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number)
{
  super(name, spriteName, enemyType.BLOB , positionX, positionY, scaleX, scaleY)
  super.setStat({hp: 3, dmg: 0, walk_speed: 4, jump_height: 0, attackspeed:0})
  fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.ki);


}


private ki()
{




}




}




}