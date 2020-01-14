"use strict";
var Game;
(function (Game) {
    class Platform extends Game.Environment {
        constructor(nodeName) {
            super(nodeName);
        }
    }
    Game.Platform = Platform;
})(Game || (Game = {}));
//# sourceMappingURL=Platform.js.map