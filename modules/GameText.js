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
        this.size = options.size || 10;
        this.font_family = options.font_family || "sans-serif";
        this.font_misc = options.font_misc || "";
        this.textAlign = options.textAlign || "start";
        this.baselineAlign = options.baselineAlign || "alphabetic";
        this.drawMode = options.drawMode || "fill";
        this.color = options.color;
        this.lineColor = options.lineColor;

    }

    Text.prototype = Object.create(GameObject.prototype);

    Text.prototype.render = function render(context, parentPosition) {
        var defaultFont = context.font,
            defaultAlign = context.textAlign,
            defaultBase = context.textBaseline,
            fillStyle = context.fillStyle,
            strokeStyle = context.strokeStyle;

        context.font = this.font_misc + " " + this.size + "px " + this.font_family;
        context.textAlign = this.textAlign;
        context.textBaseline = this.baselineAlign;
        context.fillStyle = this.color || fillStyle;
        context.strokeStyle = this.lineColor || strokeStyle;

        if (this.drawMode === "fill" || this.drawMode === "fillNStroke") {
            context.fillText(this.text, this.absolutePosition.x, this.absolutePosition.y);
        }

        if (this.drawMode === "stroke" || this.drawMode === "fillNStroke") {
            context.strokeText(this.text, this.absolutePosition.x, this.absolutePosition.y);
        }

        context.font = defaultFont;
        context.textAlign = defaultAlign;
        context.textBaseline = defaultBase;
        context.fillStyle = fillStyle;
        context.strokeStyle = strokeStyle;

    };


    window.Trios2D.GameText = Text;

}(window));
