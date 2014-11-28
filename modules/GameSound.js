(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        throw new Error("You must include Trios2D in your HTML");

    var Trios2D = window.Trios2D,
        Vector = Trios2D.Vector,
        GameObject = Trios2D.GameObject;


    /*
     * Creates a new Sound object.
     */
    function Sound(sound) {
        // Calling GameObject Constructor
        GameObject.apply(this);

        if (typeof sound == "string") {
            sound = window.document.createElement("audio");
            sound.src = arguments[0];
        }

        if (sound.localName != "audio") {
            throw new Error("First paramether has to be an audio element or an audio source");
        }

        this._audio = sound;
        this._audio.preload = true;
        this._audio.style.display = "none";
        this.playFromBegining = true;

        this._audio.onended = (function ended() {
            this.stop();
        }).bind(this);
    }

    Sound.prototype = Object.create(GameObject.prototype,  {

        currentTime: {
            enumerable: true,
            get: function currentTime() {
                return this._audio.currentTime;
            },

            set: function currentTime(val) {
                return this._audio.currentTime = val;
            }
        },

        duration: {
            enumerable: true,
            get: function duration() {
                return this._audio.duration;
            }
        },

        ended: {
            enumerable: true,
            get: function ended() {
                return this._audio.ended;
            }
        },

        loop: {
            enumerable: true,
            get: function loop() {
                return this._audio.loop;
            },

            set: function loop(val) {
                return this._audio.loop = val;
            }
        },

        paused: {
            enumerable: true,
            get: function paused() {
                return this._audio.paused;
            },

            set: function paused(val) {
                return this._audio.paused = val;
            }
        },

        volume: {
            enumerable: true,
            get: function volume() {
                return this._audio.volume;
            },

            set: function volume(val) {
                return this._audio.volume = val;
            }
        }
    });

    Sound.prototype.play = function play() {
        if(!this.paused && this.playFromBegining) {
            this.stop();
        }

        this._audio.play();
    };

    Sound.prototype.resume = function resume() {
        if(this.paused) this._audio.play();
    };

    Sound.prototype.pause = function pause() {
        this._audio.pause();
    };

    Sound.prototype.stop = function stop() {
        this.currentTime = 0;
        this.pause();
    };


    window.Trios2D.GameSound = Sound;

}(window));
