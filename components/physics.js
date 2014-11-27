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

        this._velocity = new Vector();
        this._aceleration = new Vector();

    }

    Physics.prototype = Object.create({
        get position() {
            if (this.gameObject) {
                return this.gameObject.position;
            }
        },

        set position(val) {
            if (this.gameObject) {
                this.gameObject.position = val;
            }
        },

        get velocity() {
            if (this.position == this._lastPosition) {
                return this._velocity;
            } else {
                // immediat position change would make the velocity increases in the update frame where it was made
                return this.position.sub(this._lastPosition).divide(this._lastDelta / 1000);
            }
        },

        set velocity(val) {
            this._velocity = val;
        },

        get aceleration() {
            if (this.velocity == this._lastVelocity) {
                return this._aceleration;
            } else {
                // immediat velocity change would make the aceleration increases in the update frame where it was made
                return this.velocity.sub(this._lastVelocity).divide(this._lastDelta / 1000);
            }
        },

        set aceleration(val) {
            this._aceleration = val;
        }

    }, Component.prototype);

    Physics.prototype.update = function update(delta, gameObject) {

        if (this._aceleration.hasValue()) {
            this._velocity = this._velocity.add(this._aceleration.multiply(delta / 1000));
        }

        if (this._velocity.hasValue()) {
            this.position = this.position.add(this._velocity.multiply(delta / 1000));
        }


        this._lastPosition = this.position;
        this._lastVelocity = this._velocity;
        this._lastDelta = delta;
    };


    window.Trios2D.Components.Physics = Physics;

}(window));
