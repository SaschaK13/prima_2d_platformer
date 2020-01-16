"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class Character extends fudge.Node {
        constructor(nodeName) {
            super(nodeName);
            //private static speedMax: number = 1.5; // units per second
            this.speed = new fudge.Vector2(0, 0);
            this.fallSpeed = new fudge.Vector2(0, -1);
            this.gravitySpeed = 0;
            this.gravity = -0.8;
            this.falling = true;
            this.isColliding = false;
            this.update = (_event) => {
                this.positionBevorUpdate = this.cmpTransform.local.translation;
                if (this.falling) {
                    let timeFrame = fudge.Loop.timeFrameGame / 1000;
                    this.gravitySpeed += this.gravity;
                    this.cmpTransform.local.translateY((this.speed.y + this.gravitySpeed) * timeFrame);
                }
                this.positionAfterUpdate = this.cmpTransform.local.translation;
                if (this.isColliding) {
                    this.gravitySpeed = 0;
                    this.stand(this.positionBevorUpdate.y, this.positionAfterUpdate.y);
                }
            };
            this.mesh = new fudge.MeshQuad();
            this.cmpMesh = new fudge.ComponentMesh(this.mesh);
            this.addComponent(this.cmpMesh);
            this.transcmp = new fudge.ComponentTransform();
            this.addComponent(this.transcmp);
            fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
        }
        collideWith(colissionObject) {
            let colissionObjectPosition = colissionObject.cmpTransform.local.translation;
            let colissionObjectScaling = colissionObject.getComponent(fudge.ComponentMesh).pivot.scaling;
            let characterPosition = this.cmpTransform.local.translation;
            let characterScaling = this.getComponent(fudge.ComponentMesh).pivot.scaling;
            if (characterPosition.x < colissionObjectPosition.x + colissionObjectScaling.x &&
                characterPosition.x + characterScaling.x > colissionObjectPosition.x &&
                characterPosition.y < colissionObjectPosition.y + colissionObjectScaling.y &&
                characterPosition.y + characterScaling.y > colissionObjectPosition.y) {
                this.isColliding = true;
                this.collissionObject = colissionObject;
                return true;
            }
            else {
                this.isColliding = false;
                return false;
            }
        }
        stand(a, b) {
            let pointA = a;
            let pointB = b;
            let distance = pointA - pointB;
            let middlePoint = distance / 2;
            if (distance >= 0.05) {
                this.cmpTransform.local.translation = new fudge.Vector3(this.cmpTransform.local.translation.x, middlePoint, 0);
                if (this.collideWith(this.collissionObject)) {
                    pointB = middlePoint;
                }
                else {
                    pointA = middlePoint;
                }
                this.stand(pointA, pointB);
            }
            else {
                //this.cmpTransform.local.translateY(-(this.cmpTransform.local.scaling.y)/2)
            }
        }
    }
    Game.Character = Character;
})(Game || (Game = {}));
//# sourceMappingURL=Character.js.map