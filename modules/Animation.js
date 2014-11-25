(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        throw new Error("You must include Trios2D in your HTML");

    var Trios2D = window.Trios2D,
        Vector = Trios2D.Vector,
        GameObject = Trios2D.GameObject;


    /*
     * Is a set of images which changes over time
     */
    function Animation(imageSet, options) {
        // Calling GameObject Constructor
        GameObject.apply(this);

        options = options || {};
        // An array of images
        if (Array.isArray(imageSet) && typeof imageSet !== "string") {
            this.images = Array.prototype.map.call(imageSet, function (rawItem) {
                var imageToReturn = {},
                    item, moreindeep;
                if (typeof rawItem === "string" || rawItem.localName === "image") {
                    item = rawItem;
                } else if (typeof rawItem === "object" && rawItem.image) {
                    item = rawItem.image;
                    moreindeep = true;
                } else {
                    throw new Error("invalid Image definition passed as parameter");
                }

                if (typeof item === "string") {
                    imageToReturn.image = window.document.createElement("img");
                    imageToReturn.image.src = item;
                    item = imageToReturn.image;
                }

                if (item.localName === "img") {

                    imageToReturn.image = item;

                    if (imageToReturn.image.complete) {
                        imageToReturn.originalSize = imageToReturn.size = new Vector(imageToReturn.image.width, imageToReturn.image.height);
                    } else {
                        imageToReturn.image.addEventListener("load", function () {
                            imageToReturn.size = imageToReturn.size || new Vector(imageToReturn.image.width, imageToReturn.image.height);
                            imageToReturn.originalSize = imageToReturn.originalSize || imageToReturn.size;
                        });
                    }

                    imageToReturn.clipStart = new Vector();
                }

                if (moreindeep) {
                    imageToReturn.clipStart = rawItem.clipStart ? new Vector(rawItem.clipStart) : imageToReturn.clipStart;
                    imageToReturn.originalSize = rawItem.originalSize ? new Vector(rawItem.originalSize) : imageToReturn.originalSize;
                    imageToReturn.size = rawItem.size ? new Vector(rawItem.size) : imageToReturn.originalSize;
                }

                return imageToReturn;
            });
        } else {
            var spritesheet, imageSize;
            if (typeof imageSet === "string") {
                spritesheet = window.document.createElement("img");
                spritesheet.src = imageSet;
                imageSet = spritesheet;
            }

            if (imageSet.localName === "img") {

                spritesheet = imageSet;

                imageSize = new Vector(spritesheet.width, spritesheet.height);

            }

            if (!options.spriteSize) {
                throw new Error("Must specify the sprite size");
            }

            this.images = [];

            options.imageSize = options.imageSize ? new Vector(options.imageSize) : imageSize;
            options.margin = new Vector(options.margin);
            options.spriteSize = new Vector(options.spriteSize);

            var horizontalSprites = Math.floor(options.imageSize.x / (options.margin.x + options.spriteSize.x)),
                verticalSprites = Math.floor(options.imageSize.y / (options.margin.y + options.spriteSize.y)),
                imageNumber = options.imageNumber || horizontalSprites * verticalSprites;

            var i, horizontal, vertical;
            for (i = 0; i < imageNumber; i++) {
                horizontal = i % horizontalSprites;
                vertical = Math.floor(i / horizontalSprites);

                this.images.push({
                    image: imageSet,
                    originalSize: new Vector(options.spriteSize),
                    scaleSize: new Vector(options.spriteSize),
                    size: new Vector(options.spriteSize),
                    clipStart: new Vector(options.margin.x + (horizontal * (options.spriteSize.x + options.margin.x)),
                        options.margin.y + (vertical * (options.spriteSize.y + options.margin.y)))
                });
            }
        }

        this.framesPerSecond = options.framesPerSecond || 10;
        this.timeSinceChange = 0;
        this.current = 0;
        this.scale = options.scale || 1;
        this.pingpong = false;
        this.step = 1;
    }

    Animation.prototype = Object.create(GameObject.prototype);

    Animation.prototype.update = function update(delta) {
        this.timeSinceChange += delta;
        var framesToChange = Math.floor(this.timeSinceChange / (1000 / this.framesPerSecond));

        if (framesToChange >= 1) {
            this.timeSinceChange = 0;
            this.current += framesToChange * this.step;
            var excess = this.current - this.images.length;
            if (excess >= 0) {
                if (this.pingpong) {
                    this.current = this.images.length - excess - 1;
                    this.step = -this.step;
                } else {
                    this.current = excess;
                }
            } else if (excess <= -this.images.length) {
                if (this.pingpong) {
                    this.current = -(this.images.length + excess);
                    this.step = -this.step;
                }
            }
        }
    };

    Animation.prototype.render = function render(context, parentPosition) {
        if (this.images[this.current]) {
            context.drawImage(this.images[this.current].image,
                this.images[this.current].clipStart.x, this.images[this.current].clipStart.y,
                this.images[this.current].originalSize.x, this.images[this.current].originalSize.y,
                this.absolutePosition.x, this.absolutePosition.y,
                this.images[this.current].originalSize.multiply(this.scale).x, this.images[this.current].originalSize.multiply(this.scale).y);
        }
    };

    Animation.prototype.reverse = function () {
        this.images = this.images.reverse();
    };

    Object.defineProperty(Animation.prototype, "size", {
        get: function () {
            return this.images[this.current].originalSize.multiply(this.scale);
        }
    });



    window.Trios2D.Animation = Animation;

}(window));
