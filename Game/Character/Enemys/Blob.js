"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Blob extends Game.Character {
        constructor(name, spriteName, positionX, positionY, scaleX, scaleY) {
            super(name);
            this.currentMovmentDuration = 0;
            this.behavior = (_event) => {
                this.ki();
            };
            this.name = name;
            this.spriteName = spriteName;
            this.cmpTransform.local.translation = new fudge.Vector3(positionX, positionY, 0);
            this.cmpTransform.local.scaling = new fudge.Vector3(scaleX, scaleY, 0);
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(0, 1, 0, 1)));
            // this.addComponent(new fudge.ComponentMaterial(material));
            this.setStats({ hp: 1, dmg: 0, walkSpeed: 1, jumpHeight: 0, attackSpeed: 0 });
            this.movementDuration = Game.Util.getInstance().getRandomRange(2, 3);
            this.randomDirection();
            super.addSpriteListener();
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.behavior);
        }
        die() {
            this.dropItem();
            this.getParent().removeChild(this);
            Game.Util.getInstance().level.deleteEnemy(this);
        }
        ki() {
            if (this.currentMovmentDuration != this.movementDuration) {
                this.walk(this.movedirection);
                this.currentMovmentDuration++;
            }
            else {
                this.movementDuration = Game.Util.getInstance().getRandomRange(100, 200);
                this.randomDirection();
                this.currentMovmentDuration = 0;
            }
        }
        dropItem() {
            let possibleItemsArray = Game.Util.getInstance().level.possibleItemsArray;
            let randomItem = Game.Util.getInstance().getRandomRange(0, possibleItemsArray.length);
            let item = possibleItemsArray[randomItem];
            item.cmpTransform.local.translation = this.cmpTransform.local.translation;
            Game.Util.getInstance().level.appendToRoot(item);
            Game.Util.getInstance().level.itemArray.push(item);
        }
        randomDirection() {
            let randomnum = Game.Util.getInstance().getRandomRange(1, 3);
            if (randomnum == 1) {
                this.movedirection = Game.DIRECTION.RIGHT;
            }
            else {
                this.movedirection = Game.DIRECTION.LEFT;
            }
        }
    }
    Game.Blob = Blob;
})(Game || (Game = {}));
//# sourceMappingURL=Blob.js.map