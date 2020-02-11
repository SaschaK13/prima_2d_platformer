"use strict";
var Game;
(function (Game) {
    class Util {
        constructor() {
            this.enemyArray = [];
        }
        static getInstance() {
            if (!Util.instance) {
                Util.instance = new Util();
            }
            return Util.instance;
        }
        getCollidableObjects() {
            return this.collidableObjects;
        }
        setCollidableObjects(array) {
            this.collidableObjects = array;
        }
    }
    Game.Util = Util;
})(Game || (Game = {}));
//# sourceMappingURL=Util.js.map