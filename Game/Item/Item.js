"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Item extends fudge.Node {
        constructor(nodeName, spriteName, hp, dmg, jumpHeight, walkSpeed, attackSpeed) {
            super(nodeName);
            this.stats = { hp: 0, dmg: 0, jumpHeight: 0, walkSpeed: 0, attackSpeed: 0 };
            this.spriteName = spriteName;
            this.hp = hp;
            this.dmg = dmg;
            this.jumpHeight = jumpHeight;
            this.walkSpeed = walkSpeed;
            this.attackSpeed = attackSpeed;
            // let material: fudge.Material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)))
            // this.addComponent(new fudge.ComponentMaterial(material));
            let cmpMesh = new fudge.ComponentMesh(Item.mesh);
            this.addComponent(cmpMesh);
            let cmpTrans = new fudge.ComponentTransform();
            this.addComponent(cmpTrans);
            this.cmpTransform.local.translateY(+1.5);
            this.stats.hp = this.hp;
            this.stats.dmg = this.dmg;
            this.stats.jumpHeight = this.jumpHeight;
            this.stats.walkSpeed = this.walkSpeed;
            this.stats.attackSpeed = this.attackSpeed;
            this.addSpriteListener();
        }
        addSpriteListener() {
            for (let key of Game.Util.getInstance().spritesMap.get(this.spriteName).keys()) {
                let sprite = Game.Util.getInstance().spritesMap.get(this.spriteName).get(key);
                let nodeSprite = new Game.NodeSprite(sprite.name, sprite);
                nodeSprite.activate(true);
                nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                this.appendChild(nodeSprite);
            }
        }
        getStats() {
            return this.stats;
        }
    }
    Item.mesh = new fudge.MeshQuad;
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map