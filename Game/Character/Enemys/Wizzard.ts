
namespace Game {

  import fudge = FudgeCore;

  export class Wizzard extends Character {
    public attacksPlayer: boolean = false;
    public name: string;
    public positionX: number;
    public positionY: number;
    public scaleX: number;
    public scaleY: number;


    private teleportCooldown = 150;
    private currentTeleportCooldown = 0;
    private shotcount = 0;


    private teleportDirection: DIRECTION = DIRECTION.LEFT;

    constructor(name: string, spriteName: string, positionX: number, positionY: number, scaleX: number, scaleY: number) {
      super(name);
      this.name = name;
      this.spriteName = spriteName;
      this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
      this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);

      // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
      // this.addComponent(new fudge.ComponentMaterial(material));
      
      this.setStats({ hp: 3, dmg: 0, walkSpeed: 2, jumpHeight: 0, attackSpeed: 100 });

      //this.movementDuration = Util.getInstance().getRandomRange(2, 3);
      //this.randomDirection();

      super.addSpriteListener();
      fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, this.behavior);
    }

    public die(): void {
      this.showOneTime(CHARACTERSTATE.DEATH);
      this.isDead = true;

      setTimeout(() => { 
        this.getParent().removeChild(this);
        Util.getInstance().level.deleteEnemy(this);
       }, 400);
    }

   

    public attack(): void {
      if (this.attackCooldown == 0 && !Util.getInstance().level.player.finished) {
        Util.getInstance().level.player.takeDmg(1);
        this.attacksPlayer = true;
        this.isAttacking = true;
        this.showOneTime(CHARACTERSTATE.ATTACK);
        this.attackCooldown = this.getStats().attackSpeed;
      }
    }


    public ki(): void {
      let player: Player = Util.getInstance().level.player;

      if(this.currentPlatform && player.currentPlatform)
      {
        if(this.currentPlatform.name == player.currentPlatform.name)
        {
          if(this.currentTeleportCooldown == this.teleportCooldown)
          {
            this.teleport(this.teleportDirection);
            this.currentTeleportCooldown = 0;
          }else
          {
            this.currentTeleportCooldown++;
          }
        }
      }
    }

    public reactToCollison(): void {
      let collisionObjects: CollidedObject[] = this.collider.getCollisionObjects();

      for (var i: number = 0; i < collisionObjects.length; i++) {
        let collisionObject: CollidedObject = collisionObjects[i];

        switch (collisionObject.collisionType) {
          case COLLISIONTYPE.ENEMY: {
            break;
          }
          case COLLISIONTYPE.ENVIRONMENT: {
            if (collisionObject.object.constructor.name == "Platform") {
              this.currentPlatform = collisionObject.object as Platform;
            }
            this.handleSolidColision(collisionObject);
            break;
          }
          case COLLISIONTYPE.PLAYER: {
            this.handleSolidColision(collisionObject);
            break;
          }
        }
      }
    }

    private setDirection(): void {
   
      switch(this.teleportDirection)
      {
        case DIRECTION.LEFT: {
          this.teleportDirection = DIRECTION.RIGHT;
          break;
        }

        case DIRECTION.RIGHT: {
          this.teleportDirection = DIRECTION.LEFT;
          break;
        } 

      }

    }
    private shoot() {
      this.showOneTime(CHARACTERSTATE.ATTACK);
      let spells: WizzardSpell = new WizzardSpell("spell" + this.shotcount, ENVIRONMENTTYPE.PLATFORM, "spell", this.cmpTransform.local.translation.x , this.cmpTransform.local.translation.y - 0.3, 0.5,0.5);
      spells.shotdirection = this.teleportDirection ;
      Util.getInstance().level.addWizardSpell(spells);
      this.shotcount++;
      
    }

    private teleport(direction: DIRECTION)
    {
      let posX = this.cmpTransform.local.translation.x;
      let posY = this.cmpTransform.local.translation.y;

    
      switch (direction) {
        case DIRECTION.LEFT: {
          this.cmpTransform.local.translation = new fudge.Vector3(posX - 5, posY+ 0.5, 0)
          this.setDirection();
           this.shoot();
          break;
        }
        case DIRECTION.RIGHT: {
          this.cmpTransform.local.translation = new fudge.Vector3(posX + 5, posY+ 0.5, 0)
          this.setDirection();
          this.shoot();
          break;
        }
      }
      

    }


    private behavior = (_event: fudge.Eventƒ): void => {
      if (!this.isDead && this.isLoaded) {
        this.ki();
      }
    }
  }
}