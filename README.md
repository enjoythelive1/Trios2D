Trios2D
=======

It is a simple, lightweight game engine for the web working over canvas

##How to Use

```javascript
var game = new Trios2D("selector", {
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

Objects can be created to the game and those when added can perform its currents updates and renders independently;

```javascript
    init: function (engine) {
        var independentObject = new Trios2D.GameObject();
        independentObject.position = new Trios2D.Vector(30,15);
        independentObject.update = function (delta) {
            ...
        };
        independentObject.render = function (context) {
            renderthings(context, this.absolutePosition.x, this.absolutePosition.y);
            ...
        };

        engine.addChild(independentObject);
    } 
```

Every object have its own childrens, so an object could be a container. An object which is made from other objects can be easyly done.

```javascript
var car = new Trios2D.GameObject();

car.wheels = [];

car.wheels[0] = new Trios2D.GameObject();
car.wheels[1] = new Trios2D.GameObject();
car.wheels[2] = new Trios2D.GameObject();
car.wheels[3] = new Trios2D.GameObject();

for (var wheel in car.wheels) {
   car.addChild(wheel);
}

game.addClild(car);
```
___

##Deeper in the Engine
The Engine is an object which encapsulates some repetitive stuff to make a game in javascript for the mothern browsers and HTML5 apps. You dont have to worry about getting the input or other stuff. With this engine your game can be as easy as objects iteracting.

So to make a new game as said before you should do this:

```javascript
var game = new Trios2D(canvas, logic);

```



Where `canvas` is a selector, representing an Canvas element, or an Canvas event as it is. Otherwise it will throw an exeption and the game would not be created.
Then is `logic`, which is optional and it is an object like this:

```javascript
var logic = {
    init: function (game) {
        initializeStuff();
    },
    
    update: function (delta, game) {
        updateStuff();
    },
    
    render: function (context, game) {
        renderStuff();
    }
}

```

All three functions in the logic object are optional. If you won't use them, just don't include them.

Here what these functions are for:

* `init`: Is the begining of the game logic. Here you can set things when the game begins and it will be executed just before the game starts ([`#start`](#Engine.start)). You are not limited to do the initialization in here. you can also make it befor you call the `#start` function in your game. The firt parameter is the game itself.

* `update`. here you can update the game logic. If you dont want to do the game by objects interacting you can just put your update logic in here and the rendering in the render function andd there's no problem. The first parameter is the time sice the last update and the second is the game itself.

* `render`: Here you can render whatever into the context. As I said before, if you would make the game like structured, so you render the stuff here. The first patameter is a *Canvas Context* where you draw stuff. More in [W3schools](http://www.w3schools.com/tags/ref_canvas.asp)

###Instance Variables

* `maxFrameRate`: is the max times `render` will be called in a second. It is default to 60, but you can set the framerate you think is better for your game.

* `maxUpdates`: is the max times `update` will be called in a second. It is default to 60, but you can set the framerate you think is better for your game.

* `cleanBeforeRender`: This specifies if the canvas will be cleared every time render is called. It is default to `true`.

* `pauseOnBlur`: This specifies if the game will pause if the canvas lose it's focus. It is default to `true`.

* `camera`: Is an `Camera` object which manages the render perspective. Click [here](#Camera) to se more.

* `childen`: Is an array containing all the `GameObject` objects that are directly in the game (not the `GameObject` children, see `GameObject#children`). **DO NOT MODIFY THIS ARRAY OR SET IT DIRECTLY UNLESS YOU KNOW WHAT YOU ARE DOING!!!**

###Metohds

* `#addChild(child)`: Adds `child` to the game. Every time update and render is called for the engine, `render` and `update` methods will be called for every `children` within the engine. The `child` must be a `GameObject`, a [Module](#Modules), or any object derived from `GameObject` (will be checked using `instaceof`)

* `#removeChild(child)`: Removes `child` from the engine, so it wont *render* or *update* until it is on the engine again.

* <a name="Engine.start"></a>`#start()`: Start the game. 

* `#pause()`: Pauses the game. By default the game pauses when canvas loose focus unless you say no (`game.pauseOnBlur = false`);

##Built-in Objects

Trios2D has some objects to work with the engine, some of them are:

###Vector

A `Vector` is simply a vector. It encapsulates *x* and *y* values and offer a set of methods to make math with them as other utitlity methods.

To make a new `Vector` just call `new Trios2D.Vector(x, y)`, where `x` and `y` are the coordenates. You can also do it these other ways:

```javascript
var coords = [x, y];
var vec1 = new Trios2D.Vector(coords); // it can take an array as parameter.
                                       // this way coors[0] is x and coors[1]
                                       // is y.
```

And this way:

```javascript
var coords = {x: 0, y: 0};
var vec1 = new Trios2D.Vector(coords); // Here coords.x is x and coords.y is y
```

####Methods

As mentioned before the an `Vector` object has some utility methods. Currents are:

* `#add(otherVector)`: This method return a new vector made by the addition of these two vectors.

* `#sub(otherVector)`: This method return a new vector made by the substraction of these two vectors.

* `#multiply(scalar)`: This method return a new vector made by the product of this vector and an scalar.

* `#divide(scalar)`: This method return a new vector made by the quotient of this vector and an scalar.

* `#invert()`: Return an inverted vector (`x` and `y` values are inverted).

* `#getAbsoluteValue()`: returns the absolute value from the vector (obtained by the pythagorean theorem).

* `#lerp(to, by)`: Linear interpolation. Return an interpolated vector from the current `Vector`object to the `to` vector by the `by` fraction.

* `#isBetween(vector1, vector2)`: Returns `true` if the current vector is in between `vector1` and `vector2` coordenates.


###GameObjects

You read about them above, dey are object made to work togueder in the game and interact. That way you can reduce your game logic to just objects interacting with each other.

A `GameObject` can be made this way: `new Trios2D.GameObject()`.

A game object has a `position` which is a `Vector` and is relative to the parent.

//TODO: Complete GameObject documentation and then the Engine it self

###Camera
//TODO: Complete content

##Modules

Trios2D has modules built in, making easy thing like images managing or animations. It isn't very complete yet, but it is growing. All the modules are Game Objects and you can treat them as it. Modules are in the `./modules` folder.

###Some Modules

####GameImage

It is a module to manage images. It implements the render and update methods so you just have to specify the image and the size and it will make the work for you.

To include it you must import the `./modules/GameImage.js` script.

```html
<script src="js/Trios2D.js"></script>
...
<script src="js/modules/GameImage.js"></script>
```

To make a new image use `new Trios2D.GameImage(image, size)` where image is an `HTMLImage` Object or a source string. If the browser supports data url GameImage too. The `size` is an `Vector` object, an object containing `{x: 0, y: 0}` or even an array `[x, y]`.

If you are working with sprites you can make the `GameImage` this way: `new Trios2D.GameImage(image, clipStart, size)`. Here `clipStart` is where to start trimming the image, and the size is how much to trim. The same as `size`, `clipStart`can be a `Vector` and object or an array.

//TODO: Complete GameImage Documentation and other models as Components
