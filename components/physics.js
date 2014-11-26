(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        throw new Error("You must include Trios2D in your HTML");

    var Trios2D = window.Trios2D,
        Vector = Trios2D.Vector,
        GameObject = Trios2D.GameObject,
        Component = Trios2D.Component;


    function Physics() {
        // Calling Component Constructor
        Component.apply(this);

        this.velocity = new Vector();
        this.aceleration = new Vector();

    }

    Physics.prototype = Object.create(Component.prototype);

    Physics.prototype.update = function update(delta, gameObject) {
        this.position = gameObject.position;

        if (this.aceleration) {
            this.velocity = this.velocity.add(this.aceleration.multiply(delta / 1000));
        }

        if (this.velocity) {
            this.position = this.position.add(this.velocity.multiply(delta / 1000));
        }

        gameObject.position = this.position;
    };


    window.Trios2D.Components.Physics = Physics;

}(window));
