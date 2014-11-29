/********************************* Event Manager Definition **********************************/
(function (window, undefined) {
    "use strict";

    if (!window.Trios2D)
        window.Trios2D = {};

    var Trios2D = window.Trios2D;

    Trios2D.Utilities = Trios2D.Utilities || {};

    if (Trios2D.Utilities.EventManager)
        return;

    function EventManager() {
        this.events = {};
    };

    EventManager.prototype.on = EventManager.prototype.addEventListener = function addEventlistener(event, fn) {
        if (typeof fn !== "function")
            throw new TypeError("The listener must be a function");

        if (!this.events[event]) {
            this.events[event] = [];
        }

        if (!this[event])
            this[event] = this.trigger.bind(this, event);

        this.events[event].push(fn);
    };

    EventManager.prototype.off = EventManager.prototype.removeAllEventListener = function removeAllEventListener(event) {
        this.events[event] = [];
    };

    EventManager.prototype.removeEventListener = function removeEventListener(event, fn) {
        if (!this.events[event])
            return;

        var index = this.events[event].indexOf(fn);

        if (index == -1)
            return;

        this.events[event].splice(index, 1);
    };

    EventManager.prototype.trigger = EventManager.prototype.emmit = function trigger(event) {
        var self = this,
            args = Array.prototype.slice.call(arguments, 1);

        if (!this.events[event])
            return;


        setTimeout(function () {
            self.events[event].forEach(function (e) {
                e.apply(self.target, args);
            });
        }, 1);
    };

    EventManager.prototype.once = function once(event, fn) {
        var self = this,
            args = arguments,
            toReg = function toReg() {
                fn.apply(self.target, arguments);
                self.removeEventListener(event, toReg);
            };

        this.on(event, toReg);
    };

    EventManager.makeEmmitter = function makeEmmitter(object) {
        object.eventManager = new EventManager();

        for (var prop in object.eventManager) {
            if (typeof object.eventManager[prop] === "function") {
                object[prop] = object.eventManager[prop].bind(object.eventManager);
            }
        }
    }

    Trios2D.Utilities.EventManager = EventManager;

}(window));;
/*********************************************************************************************/


/******************************* Resource Loader Definition **********************************/
(function (window, undefined) {
    "use strict";
    if (!window.Trios2D)
        window.Trios2D = {};

    var Trios2D = window.Trios2D;

    Trios2D.Utilities = Trios2D.Utilities || {};

    function ResourcePreloader() {
        Trios2D.Utilities.EventManager.makeEmmitter(this);
        this._loaded = 0;
        this._total = 0;
        this.toLoad = [];
    }

    ResourcePreloader.prototype = {
        get loaded() {
            return this._loaded;
        },

        get total() {
            return this._total;
        },

        get progress() {
            return this.loaded / this.total;
        },

        set onprogress(listener) {
            this.on("progress", listener);
        },

        set onload(listener) {
            this.on("load", listener);

        },

        set oncomplete(listener) {
            this.onload = listener;
        },

        set onerror(listener) {
            this.on("error", listener);
        },

        _elementLoaded: function _elementLoaded(element) {
            element.loaded = true;
            this._loaded++;

            this.trigger("progress", {
                resource: element.resource,
                progress: this.progress
            });

            if (this._loaded / this._total >= 1)
                this.trigger("load", {
                    resources: this.toLoad.filter(function (item) {
                        return item.loaded;
                    }).map(function (item) {
                        return item.resource;
                    })
                });

        },

        _errorLoading: function _errorLoading(element) {
            element.error = true;
            this._total--;
            this.trigger("error", element);
        },

        preloadImage: function preloadImage(image) {
            var img = window.document.createElement("img");
            img.src = image;

            var element = {
                resource: img,
                loaded: false
            };

            this.toLoad.push(element);
            this._total++;

            if (element.resource.complete) {
                setTimeout(this._elementLoaded.bind(this, element), 1);
            } else {
                element.resource.addEventListener("load", this._elementLoaded.bind(this, element));

                element.resource.addEventListener("error", this._errorLoading.bind(this, element));
            }
        },

        preloadSound: function preloadSound(sound) {
            var audio = window.document.createElement("audio");
            audio.src = sound;
            audio.preload = "auto";

            var element = {
                resource: audio,
                loaded: false
            };

            this.toLoad.push(element);
            this._total++;

            element.resource.addEventListener("canplaythrough", this._elementLoaded.bind(this, element));

            element.resource.addEventListener("error", this._errorLoading.bind(this, element));

        }

    };

    Trios2D.Utilities.ResourcePreloader = ResourcePreloader;


}(window));
