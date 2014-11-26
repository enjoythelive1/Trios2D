(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        throw new Error("You must include Trios2D in your HTML");

    var Trios2D = window.Trios2D,
        Vector = Trios2D.Vector,
        GameObject = Trios2D.GameObject;

    /*
     * Creates a new Text object.
     */
    function Text(text, options) {
        // Calling GameObject Constructor
        GameObject.apply(this);

        this.text = text;
        this.font_size = options.size || 10;
        this.font_family = options.font_family || "sans-serif";
        this.font_misc = options.font_misc || "";
        this.textAlign = options.textAlign || "start";
        this.baselineAlign = options.baselineAlign || "alphabetic";
        this.drawMode = options.drawMode || "fill";
        this.fillStyle = options.fillStyle;
        this.strokeStyle = options.strokeStyle;
        this.strokeWidth = options.strokeWidth;

    }

    Text.prototype = Object.create(GameObject.prototype);

    Text.prototype.render = function render(context, parentPosition) {
        context.save(); // before render

        context.font = this.font_misc + " " + this.font_size + "px " + this.font_family;
        context.textAlign = this.textAlign;
        context.textBaseline = this.baselineAlign;
        context.fillStyle = this.fillStyle || context.fillStyle;
        context.strokeStyle = this.strokeStyle || context.fillStyle;
        context.lineWidth = this.strokeWidth || context.lineWidth

        if (this.drawMode === "fill" || this.drawMode === "fillNStroke") {
            context.fillText(this.text, this.absolutePosition.x, this.absolutePosition.y);
        }

        if (this.drawMode === "stroke" || this.drawMode === "fillNStroke") {
            context.strokeText(this.text, this.absolutePosition.x, this.absolutePosition.y);
        }

        context.restore(); // after render

    };


    window.Trios2D.GameText = Text;

}(window));
