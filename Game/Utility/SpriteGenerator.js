"use strict";
var Game;
(function (Game) {
    var fudge = FudgeCore;
    class SpriteFrame {
    }
    Game.SpriteFrame = SpriteFrame;
    class Sprite {
        constructor(_name) {
            this.frames = [];
            this.name = _name;
        }
        static getMesh() {
            return Sprite.mesh;
        }
        /**
         * Creates a series of frames for this [[Sprite]] resulting in pivot matrices and materials to use on a sprite node
         * @param _texture The spritesheet
         * @param _rects A series of rectangles in pixel coordinates defining the single sprites on the sheet
         * @param _resolutionQuad The desired number of pixels within a length of 1 of the sprite quad
         * @param _origin The location of the origin of the sprite quad
         */
        generate(_texture, _rects, _resolutionQuad, _origin) {
            this.frames = [];
            let framing = new fudge.FramingScaled();
            framing.setScale(1 / _texture.image.width, 1 / _texture.image.height);
            let count = 0;
            for (let rect of _rects) {
                let frame = this.createFrame(this.name + `${count}`, _texture, framing, rect, _resolutionQuad, _origin);
                frame.timeScale = 1;
                this.frames.push(frame);
                // ƒ.Debug.log(frame.rectTexture.toString());
                // ƒ.Debug.log(frame.pivot.toString());
                // ƒ.Debug.log(frame.material);
                count++;
            }
        }
        generateByGrid(_texture, _startRect, _frames, _borderSize, _resolutionQuad, _origin) {
            let rect = _startRect.copy;
            let rects = [];
            while (_frames--) {
                rects.push(rect.copy);
                rect.position.x += _startRect.size.x + _borderSize.x;
                if (rect.right < _texture.image.width)
                    continue;
                _startRect.position.y += _startRect.size.y + _borderSize.y;
                rect = _startRect.copy;
                if (rect.bottom > _texture.image.height)
                    break;
            }
            //rects.forEach((_rect: fudge.Rectangle) => fudge.Debug.log(_rect.toString()));
            this.generate(_texture, rects, _resolutionQuad, _origin);
        }
        createFrame(_name, _texture, _framing, _rect, _resolutionQuad, _origin) {
            let rectTexture = new fudge.Rectangle(0, 0, _texture.image.width, _texture.image.height);
            let frame = new SpriteFrame();
            frame.rectTexture = _framing.getRect(_rect);
            frame.rectTexture.position = _framing.getPoint(_rect.position, rectTexture);
            let rectQuad = new fudge.Rectangle(0, 0, _rect.width / _resolutionQuad, _rect.height / _resolutionQuad, _origin);
            frame.pivot = fudge.Matrix4x4.IDENTITY;
            frame.pivot.translate(new fudge.Vector3(rectQuad.position.x + rectQuad.size.x / 2, -rectQuad.position.y - rectQuad.size.y / 2, 0));
            frame.pivot.scaleX(rectQuad.size.x);
            frame.pivot.scaleY(rectQuad.size.y);
            // ƒ.Debug.log(rectQuad.toString());
            let coat = new fudge.CoatTextured();
            coat.pivot.translate(frame.rectTexture.position);
            coat.pivot.scale(frame.rectTexture.size);
            coat.name = _name;
            coat.texture = _texture;
            frame.material = new fudge.Material(_name, fudge.ShaderTexture, coat);
            // ƒ.Debug.log(coat.pivot.toString());  
            return frame;
        }
    }
    Sprite.mesh = new fudge.MeshSprite();
    Game.Sprite = Sprite;
    class NodeSprite extends fudge.Node {
        constructor(_name, _sprite) {
            super(_name);
            this.frameCurrent = 0;
            this.direction = 1;
            this.sprite = _sprite;
            this.cmpMesh = new fudge.ComponentMesh(Sprite.getMesh());
            this.cmpMaterial = new fudge.ComponentMaterial();
            this.addComponent(this.cmpMesh);
            this.addComponent(this.cmpMaterial);
            this.showFrame(this.frameCurrent);
            fudge.Debug.info("NodeSprite constructor", this);
        }
        showFrame(_index) {
            let spriteFrame = this.sprite.frames[_index];
            this.cmpMesh.pivot = spriteFrame.pivot;
            this.cmpMaterial.material = spriteFrame.material;
            fudge.RenderManager.updateNode(this);
            this.frameCurrent = _index;
        }
        showFrameNext() {
            this.frameCurrent = (this.frameCurrent + this.direction + this.sprite.frames.length) % this.sprite.frames.length;
            this.showFrame(this.frameCurrent);
        }
        setFrameDirection(_direction) {
            this.direction = Math.floor(_direction);
        }
    }
    Game.NodeSprite = NodeSprite;
    let spriteNames = [
        "player",
        "goblin",
        "blob",
        "dirt",
        "stone"
    ];
    let states = [
        "default",
        "idle",
        "walk",
        "jump",
        "attack",
        "death",
        "hit"
    ];
    function loadSprites() {
        let textureImage;
        let spritesMap = new Map;
        for (let i = 0; i < spriteNames.length; i++) {
            let spriteArray = new Map;
            for (let j = 0; j < states.length; j++) {
                textureImage = Game.Util.getInstance().getTextureImageBy(spriteNames[i], states[j]);
                if (textureImage.image) {
                    spriteArray.set(states[j], generateSprites(textureImage, spriteNames[i], states[j]));
                }
            }
            spritesMap.set(spriteNames[i], spriteArray);
        }
        let util = Game.Util.getInstance();
        util.spritesMap = spritesMap;
    }
    Game.loadSprites = loadSprites;
    function generateSprites(textureImage, spriteName, stateName) {
        switch (spriteName) {
            case "player": {
                switch (stateName) {
                    case Game.CHARACTERSTATE.IDLE: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(20, 12, 32, 32), 15, new fudge.Vector2(32, 32), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.WALK: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(36, 12, 35, 35), 6, new fudge.Vector2(60, 32), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.JUMP: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(795, 2, 31, 35), 1, new fudge.Vector2(60, 32), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.ATTACK: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(1062, 10, 50, 35), 6, new fudge.Vector2(93, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.DEATH: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(422, 14, 30, 30), 11, new fudge.Vector2(66, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.HIT: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(0, 0, 30, 30), 2, new fudge.Vector2(0, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                }
            }
            case "goblin": {
                switch (stateName) {
                    case Game.CHARACTERSTATE.IDLE: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(50, 60, 50, 50), 4, new fudge.Vector2(100, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.WALK: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(50, 60, 50, 50), 8, new fudge.Vector2(100, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                }
            }
            case "blob": {
                switch (stateName) {
                    case Game.CHARACTERSTATE.IDLE: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(1, 1, 32, 32), 4, new fudge.Vector2(0, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                    case Game.CHARACTERSTATE.WALK: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(1, 1, 32, 32), 4, new fudge.Vector2(0, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                }
            }
            case "dirt": {
                switch (stateName) {
                    case Game.CHARACTERSTATE.DEFAULT: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(20, 16, 40, 30), 1, new fudge.Vector2(0, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                }
            }
            case "stone": {
                switch (stateName) {
                    case Game.CHARACTERSTATE.DEFAULT: {
                        let sprite = new Sprite(spriteName + "_" + stateName);
                        sprite.generateByGrid(textureImage, fudge.Rectangle.GET(120, 43, 40, 30), 1, new fudge.Vector2(0, 0), 32, fudge.ORIGIN2D.CENTER);
                        return sprite;
                    }
                }
            }
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=SpriteGenerator.js.map