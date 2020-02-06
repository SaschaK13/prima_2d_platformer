"use strict";
var Game;
(function (Game) {
    class Platform extends Game.Environment {
        constructor() {
            super(name);
        }
        //TODO platform data objekt
        instantiatePlatform() {
            this.cmpTransform.local.scaleY(2);
        }
    }
    Game.Platform = Platform;
})(Game || (Game = {}));
//# sourceMappingURL=Platform.js.map