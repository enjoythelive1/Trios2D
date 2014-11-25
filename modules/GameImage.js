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
        // Calling GameObject Constructor
        GameObject.apply(this);

        if (typeof imageData === "string") {
            this.image = window.document.createElement("img");
            this.image.src = imageData;
        } else {
            this.image = imageData;
        }

        this.clipStart = new Vector(clipStart);
        this.originalSize = new Vector(originalSize);
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
