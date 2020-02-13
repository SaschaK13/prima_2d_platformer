"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Item extends fudge.Node {
        constructor(nodeName, spriteName, hp, dmg, jumpHeight, walkSpeed, attackSpeed) {
            super(nodeName);
            this.stats = { hp: 1, dmg: 1, jumpHeight: 1, walkSpeed: 1, attackSpeed: 1 };
            this.spriteName = spriteName;
            this.hp = hp;
            this.dmg = dmg;
            this.jumpHeight = jumpHeight;
            this.walkSpeed = walkSpeed;
            this.attackSpeed = attackSpeed;
            let material = new fudge.Material("test", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 0, 1, 1)));
            this.addComponent(new fudge.ComponentMaterial(material));
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
        }
        getStats() {
            return this.stats;
        }
    }
    Item.mesh = new fudge.MeshQuad;
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map