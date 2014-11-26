(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        throw new Error("You must include Trios2D in your HTML");

    var Trios2D = window.Trios2D,
        Vector = Trios2D.Vector,
        GameObject = Trios2D.GameObject;


    /*
     * Creates a new Image object.
     */
    function Image(imageData, clipStart, originalSize, scale) {
        var self = this;

        // Calling GameObject Constructor
        GameObject.apply(this);

        if (typeof imageData === "string") {
            this.image = window.document.createElement("img");
            this.image.src = imageData;
        } else {
            this.image = imageData;
        }

        if (arguments.length <= 2) {
            // only image and size was given
            this.clipStart = new Vector(0);

            if (clipStart) {
                this.originalSize = new Vector(clipStart);
            } else {

                if (this.image.complete) {
                    this.originalSize = new Vector(this.image.width, this.image.height);
                } else {
                    this.originalSize = new Vector(0);
                    this.image.addEventListener("load", function () {
                        self.originalSize = (self.originalSize.x && self.originalSize.y) ? self.originalSize : new Vector(self.image.width, self.image.height);
                    });
                }
            }
        } else {
            // clipStart and size was given
            this.clipStart = new Vector(clipStart);
            this.originalSize = new Vector(originalSize);
        }

        this.scale = scale || 1;
    }

    Image.prototype = Object.create(GameObject.prototype);

    Image.prototype.render = function render(context, parentPosition) {
        context.drawImage(this.image,
            this.clipStart.x, this.clipStart.y,
            this.originalSize.x, this.originalSize.y,
            this.absolutePosition.x, this.absolutePosition.y,
            this.originalSize.multiply(this.scale).x, this.originalSize.multiply(this.scale).y);
    };

    Object.defineProperty(Image.prototype, "size", {
        get: function () {
            return this.originalSize.multiply(this.scale);
        }
    });


    window.Trios2D.GameImage = Image;

}(window));
