Trios2D
=======

It is a simple, lightweight game engine for the web working over canvas

##How to Use

```javascript
var game = new Engine("selector", {
    init: function () {
        ...
    },
    render: function (canvasContext) {
        ...
    },
    update: function (delta) {
        ...
    }
});

game.start();
```
Create an Engine object with the canvas where the game will be rendered as the first parameter and an object containing these ther methods:

* init: The begin of the game logic. Here you can set things when the game begins (*start*).
* render: Here you can render whatever into the context.
* update. here you can update the game logic.

Objects can be created to the game and those when added can perform its currents updates and renders independently;

```javascript
    init: function (engine) {
        var independentObject = new Engine.GameObject();
        independentObject.position = new Engine.Vector(30,15);
        independentObject.update = function (delta) {
            ...
        };
        independentObject.render = function (context) {
            renderthings(context, this.absolutePosition.x, this.absolutePosition.y);
            ...
        };

        independentObject.velocity = new Engine.Vector(20, 0); // Velocity can be set and the position will be updated automaticly, Acelerration too;

        engine.addChild(independentObject);
    } 
```

Objects can hold childs too.