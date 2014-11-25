(function (window, u) {
    "use strict";

    /************************************************************************************************************/
    /********************************************** Misc ******************************************************/
    /************************************************************************************************************/
    function sortGameObjects(item1, item2) {
        if (item1.renderPosition < item2.renderPosition) {
            return -1;
        } else if (item1.renderPosition > item2.renderPosition) {
            return 1;
        } else {
            return 0;
        }
    }

    /************************************************************************************************************/
    /********************************************** Vector ******************************************************/
    /************************************************************************************************************/

    /*
     * Creates a new Vector.
     * @param x the horizontal position
     * @param y the vertical position
     */
    function Vector(x, y) {
        if (Array.isArray(x)) {
            this.x = x[0] || 0;
            this.y = x[1] || 0;
        } else if (typeof x === "object") {
            this.x = x.x || 0;
            this.y = x.y || 0;
        } else {
            this.x = x || 0;
            this.y = y || 0;
        }
    }

    Vector.prototype = {
        /*
         * Adds to vectors
         * @param vector the vector to sum to
         */
        add: function add(vector) {
            return new Vector(this.x + vector.x, this.y + vector.y);
        },

        /*
         * Substracts to vectors
         * @param vector the vector to sub to
         */
        sub: function sub(vector) {
            return new Vector(this.x - vector.x, this.y - vector.y);
        },

        /*
         * Multiply to vectors
         * @param vector the vector or scalar to Multiply to
         */
        multiply: function multiply(vector) {
            if (vector instanceof Vector) {
                return new Error("Not Implemented");
            } else {
                return new Vector(this.x * vector, this.y * vector);
            }
        },

        /*
         * Divides to vectors
         * @param vector the vector or scalar to divide to
         */
        divide: function divide(vector) {
            if (vector instanceof Vector) {
                return new Error("Not Implemented");
            } else {
                return new Vector(this.x * vector, this.y * vector);
            }
        },

        /*
         * check if this vector is between to vectors
         */
        isBetween: function isBetween(vector1, vector2) {
            var isBetweenX = Math.min(vector1.x, vector2.x) <= this.x &&
                Math.max(vector1.x, vector2.x) >= this.x,

                isBetweenY = Math.min(vector1.y, vector2.y) <= this.y &&
                Math.max(vector1.y, vector2.y) >= this.y;

            return isBetweenX && isBetweenY;

        },

        /*
         * Gets the verctor absolute value
         */
        getAbsoluteValue: function getAbsolute() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        },

        /*
         * Inverts the values
         */
        invert: function invert() {
            return new Vector(-this.x, -this.y);
        },

        /*
         * Makes a linear transition from one vector to other
         */
        lerp: function lerp(other, step) {
            return this.add(other.sub(this).multiply(step));
        }

    };

    /************************************************************************************************************/
    /*********************************************** Input ******************************************************/
    /************************************************************************************************************/

    /*
     * Contains info about the input for the game
     * @param input reference to the object where the key events are saved
     */

    function Input(input) {
        this.kbInput = input;
    }

    Input.prototype = {
        /*
         * Chech if the specified key was pressed
         * @param keyCode the key to check
         */
        isKeyPressed: function isKeyPressed(keyCode) {
            var pressed = this.kbInput.keypress[keyCode];
            delete this.kbInput.keypress[keyCode];
            return pressed;
        },

        /*
         * Chech if the specified key is down at the moment
         * @param keyCode the key to check
         */
        isKeyDown: function isKeyDown(keyCode) {
            if (keyCode === Input.ANY) {
                var prop;

                for (prop in this.kbInput.keydown) {
                    if (this.kbInput.keydown[prop]) {
                        return this.kbInput.keydown[prop];
                    }
                }
            }

            return this.kbInput.keydown[keyCode];
        },

        /*
         * Chech if the specified key is going up at the moment
         * @param keyCode the key to check
         */
        isKeyUp: function isKeyUp(keyCode) {
            if (keyCode === Input.ANY) {
                var prop;

                for (prop in this.kbInput.keyup) {
                    if (this.kbInput.keyup[prop]) {
                        return this.kbInput.keyup[prop];
                    }
                }
            }

            return this.kbInput.keyup[keyCode];
        }
    };

    // Key variables
    Input.ANY = -1;
    Input.BACKSPACE = 8;
    Input.TAB = 9;
    Input.ENTER = 13;
    Input.SHIFT = 16;
    Input.CTRL = 17;
    Input.ALT = 18;
    Input.PAUSE = 19;
    Input.CAPS_LOCK = 20;
    Input.ESCAPE = 27;
    Input.PAGE_UP = 33;
    Input.PAGE_DOWN = 34;
    Input.END = 35;
    Input.HOME = 36;
    Input.LEFT_ARROW = 37;
    Input.UP_ARROW = 38;
    Input.RIGHT_ARROW = 39;
    Input.DOWN_ARROW = 40;
    Input.INSERT = 45;
    Input.DELETE = 46;
    Input.KB_0 = 48;
    Input.KB_1 = 49;
    Input.KB_2 = 50;
    Input.KB_3 = 51;
    Input.KB_4 = 52;
    Input.KB_5 = 53;
    Input.KB_6 = 54;
    Input.KB_7 = 55;
    Input.KB_8 = 56;
    Input.KB_9 = 57;
    Input.A = 65;
    Input.B = 66;
    Input.C = 67;
    Input.D = 68;
    Input.E = 69;
    Input.F = 70;
    Input.G = 71;
    Input.H = 72;
    Input.I = 73;
    Input.J = 74;
    Input.K = 75;
    Input.L = 76;
    Input.M = 77;
    Input.N = 78;
    Input.O = 79;
    Input.P = 80;
    Input.Q = 81;
    Input.R = 82;
    Input.S = 83;
    Input.T = 84;
    Input.U = 85;
    Input.V = 86;
    Input.W = 87;
    Input.X = 88;
    Input.Y = 89;
    Input.Z = 90;
    Input.LEFT_WINDOW_KEY = 91;
    Input.RIGHT_WINDOW_KEY = 92;
    Input.SELECT_KEY = 93;
    Input.NUMPAD_0 = 96;
    Input.NUMPAD_1 = 97;
    Input.NUMPAD_2 = 98;
    Input.NUMPAD_3 = 99;
    Input.NUMPAD_4 = 100;
    Input.NUMPAD_5 = 101;
    Input.NUMPAD_6 = 102;
    Input.NUMPAD_7 = 103;
    Input.NUMPAD_8 = 104;
    Input.NUMPAD_9 = 105;
    Input.MULTIPLY = 106;
    Input.ADD = 107;
    Input.SUBTRACT = 109;
    Input.DECIMAL_POINT = 110;
    Input.DIVIDE = 111;
    Input.F1 = 112;
    Input.F2 = 113;
    Input.F3 = 114;
    Input.F4 = 115;
    Input.F5 = 116;
    Input.F6 = 117;
    Input.F7 = 118;
    Input.F8 = 119;
    Input.F9 = 120;
    Input.F10 = 121;
    Input.F11 = 122;
    Input.F12 = 123;
    Input.NUM_LOCK = 144;
    Input.SCROLL_LOCK = 145;
    Input.SEMI_COLON = 186;
    Input.EQUAL_SIGN = 187;
    Input.COMMA = 188;
    Input.DASH = 189;
    Input.PERIOD = 190;
    Input.FORWARD_SLASH = 191;
    Input.GRAVE_ACCENT = 192;
    Input.OPEN_BRACKET = 219;
    Input.BACK_SLASH = 220;
    Input.CLOSE_BRAKET = 221;
    Input.SINGLE_QUOTE = 222;


    /************************************************************************************************************/
    /********************************************** Camera ******************************************************/
    /************************************************************************************************************/

    /*
     * Creates a Camera object.
     * @param position default position
     */
    function Camera(position) {
        this.position = new Vector(position);
    }

    Camera.prototype = {
        position: null,
        get worldPosition() {
            return this.position.invert();
        }
    };



    /************************************************************************************************************/
    /********************************************** Engine ******************************************************/
    /************************************************************************************************************/

    /*
     * Creates a new game engine.
     * @param canvas is where the game will be rendered
     * @param logic is an object containig the methods "init", "update" and "render". Heart of the game
     */
    function Engine(canvas, logic) {
        if (typeof canvas === "string") {
            canvas = window.document.querySelector(canvas);
        }

        if (typeof canvas.getContext !== "function") {
            throw new Error("A valid Canvas must be provided");
        }

        this.canvas = canvas;
        canvas.setAttribute("tabindex", 1);
        this.context = canvas.getContext("2d");

        this.children = [];
        this.logic = logic;
        this.camera = new Camera()
    }

    Engine.prototype = {
        /*
         * Camera Position
         */
        camera: new Camera(),

        /*
         * Max number of frames the game should render per second
         */
        maxFrameRate: 60,

        /*
         * Indicates if every frame must be cleaned before render
         */
        cleanBeforeRender: true,

        /*
         * Max number of updates the game should do per second
         */
        maxUpdates: 60,

        /*
         * Objects involved on the game
         */
        children: u,

        /*
         * Stores info about the keyboard input
         */
        kbInput: {
            /*
             * Stores info about the key pressed
             */
            keypress: {

            },

            /*
             * Stores info about the keys which are down in the current update
             */
            keydown: {

            },

            /*
             * Stores info about the key which got up in the current update
             */
            keyup: {

            }
        },

        /*
         * Adds a game object to it
         * @param object Object to Add
         */
        addChild: function addChild(object) {
            object.parent = this;
            this.children.push(object);
        },

        /*
         * Removes a game object from it, if it exist
         * @param object Object to remove
         */
        removeChild: function removeChild(object) {
            var toDelete = this.children.indexOf(object);
            if (toDelete !== -1) {
                object.parent = u;
                this.children.splice(toDelete, 1);
            }
        },

        /*
         * Initialization of the engine
         */
        _init_: function _init_() {
            var self = this;
            this.context.fillStyle = "#ffffff";

            if (this.logic.init) {
                this.logic.init(this);
            }

            this.canvas.addEventListener("click", this.click.bind(this));
            this.canvas.addEventListener("keydown", this.keydown.bind(this));
            this.canvas.addEventListener("keypress", this.keypress.bind(this));
            this.canvas.addEventListener("keyup", this.keyup.bind(this));
            this.canvas.addEventListener("focusin", function (e) {
                if (!self.renderInterval) {
                    self.lastUpdate = u;
                    self.resume();
                }
            });

            this.canvas.addEventListener("blur", function (e) {
                if (self.renderInterval) {
                    self.pause();
                }
            });

            this.updateInterval = setInterval(this._update_.bind(this), 1000 / this.maxUpdates);
            this.renderInterval = setInterval(this._render_.bind(this), 1000 / this.maxFrameRate);
        },

        /*
         * Is called before each render
         */
        prerender: function prerender(context) {
            if (this.cleanBeforeRender) {
                context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            }
        },

        /*
         * Is called after each render
         * @param context The canvas context where will be rendered
         */
        postrender: function postrender(context) {

        },

        /*
         * Encapsulates all the render behavior
         * @param context The canvas context where will be rendered
         */
        _render_: function _render_() {
            var self = this,
                torender = this.children.sort(sortGameObjects);

            this.prerender(this.context);
            this.logic.render(this.context, this);

            torender.forEach(function (item) {
                item._render(self.context, self.camera.worldPosition);
            });

            this.postrender(this.context);
        },

        /*
         * Is called before each ubdate
         * @param delta time in milliseconds since the last render
         */
        preupdate: function preupdate(delta) {

        },

        /*
         * Is called after each ubdate
         * @param delta time in milliseconds since the last render
         */
        postupdate: function postupdate(delta) {
            this.kbInput.keyup = {};
        },

        /*
         * Encapsulates all the update behavior
         */
        _update_: function _update_() {
            var startRender = new Date().getTime(),
                delta = this.lastUpdate ? startRender - this.lastUpdate : 0;

            this.lastUpdate = startRender;

            this.preupdate(delta);
            this.logic.update(delta, this);

            this.children.forEach(function (item) {
                item._update(delta);
            });

            this.postupdate(delta);

        },

        start: function start() {
            this._init_();
        },

        /*
         * Pauses the game
         */
        pause: function pause() {
            clearInterval(this.updateInterval);
            clearInterval(this.renderInterval);
            delete this.updateInterval;
            delete this.renderInterval;
        },

        /*
         * Continues the game
         */
        resume: function resume() {

            this.updateInterval = setInterval(this._update_.bind(this), 1000 / this.maxUpdates);
            this.renderInterval = setInterval(this._render_.bind(this), 1000 / this.maxFrameRate);
        },

        click: function click(event) {
            var x, y, clickPosition;

            if (event.pageX || event.pageY) {
                x = event.pageX;
                y = event.pageY;
            } else {
                x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            x = x - this.canvas.offsetLeft + this.camera.position.x;
            y = y - this.canvas.offsetTop  + this.camera.position.y;

            clickPosition = new Vector(x, y);

            this.children.sort(sortGameObjects).reverse().every(function (item) {
                if (clickPosition.isBetween(item.position, item.position.add(item.size))) {
                    item._click(clickPosition);
                    return false;
                }

                return true;
            });

        },

        keydown: function (e) {
            this.kbInput.keydown[e.keyCode || e.which] = true;
            e.preventDefault();
        },

        keyup: function (e) {
            this.kbInput.keyup[e.keyCode || e.which] = true;
            this.kbInput.keydown[e.keyCode || e.which] = false;
            e.preventDefault();


        },

        keypress: function (e) {
            this.kbInput.keypress[-1] = true;
            this.kbInput.keypress[e.keyCode || e.which] = true;
            e.preventDefault();
        },

        getInput: function getInput() {
            return new Input(this.kbInput);
        }

    };

    /************************************************************************************************************/
    /******************************************** GameObject ****************************************************/
    /************************************************************************************************************/
    /*
    * Creates a new game object.
    */
    function GameObject() {
        this.children = [];
        this.position = new Vector();
        this.velocity = new Vector();
        this.aceleration = new Vector();
    }

    GameObject.prototype = {
        /*
        * Indicates the render position (higher is more in the front)
        */
        renderPosition: 0,

        /*
         * The Object Position
         */
        position: new Vector(),

        /*
         * Objects velocity
         */
        velocity: new Vector(),

        /*
         * Objects aceleration
         */
        aceleration: new Vector(),

        size: new Vector(),

        /*
        * Array of children
        */
        children: u,

        /*
         * Adds a game object to it
         * @param child Object to Add
         */
        addChild: function addChild(child) {
            child.parent = this;
            this.children.push(child);
        },

        /*
         * Removes a game object from it, if it exist
         * @param child Object to remove
         */
        removeChild: function removeChild(child) {
            var toDelete = this.children.indexOf(child);
            if (toDelete !== -1) {
                child.parent = u;
                this.children.splice(toDelete, 1);
            }
        },

        autoCalcSize: function autoCalcSize() {
            if (this.children.length) {
                this.size = new Engine.Vector(Math.max.apply(Math, this.children.map(function (item) {
                    return item.position.x + item.size.x;
                })), Math.max.apply(Math, this.children.map(function (item) {
                    return item.position.y + item.size.y;
                })));
            }

            return this.size;

        },

        /*
        * What the game object will do in every update
        * @param delta time in milliseconds since the last render
        */
        _update: function (delta) {
            if (this.aceleration) {
                this.velocity = this.velocity.add(this.aceleration.multiply(delta / 1000));
            }

            if (this.velocity) {
                this.position = this.position.add(this.velocity.multiply(delta / 1000));
            }

            if (typeof this.update === "function") {
                this.update(delta);
            }

            this.children.forEach(function (item) {
                item._update(delta);
            });

        },

        /*
        * What the game object will do in every render
        * @param context The canvas context where will be rendered
        */
        _render: function (context, parentPosition) {
            var self = this,
                torender = this.children.sort(sortGameObjects);

            this.absolutePosition = parentPosition.add(this.position);

            if (typeof this.render === "function") {
                this.render(context, parentPosition);
            }

            torender.forEach(function (item) {
                item._render(context, self.absolutePosition);
            });
        },

        _click: function (clickPosition) {
            var localClick = clickPosition.sub(this.position);
            if (typeof this.click !== "function" || this.click(localClick) !== false) {

                this.children.sort(sortGameObjects).reverse().every(function (item) {
                    if (localClick.isBetween(item.position, item.position.add(item.size))) {
                        item._click(localClick);
                        return false;
                    }

                    return true;
                });
            }
        }
    };





    /************************************************************************************************************/
    /***************************************** Exporting Objects ************************************************/
    /************************************************************************************************************/

    Engine.GameObject = GameObject;
    Engine.Input = Input;
    Engine.Vector = Vector;

    window.Trios2D = Engine;

}(window));
