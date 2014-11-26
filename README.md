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

car.position = new Trios2D.Vector(100, 200);

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

* `camera`: Is an `Camera` object which manages the render perspective. Click [here](#camera) to se more.

* `childen`: Is an array containing all the `GameObject` objects that are directly in the game (not the `GameObject` children, see [`GameObject#children`](#GameObject.children)). **DO NOT MODIFY THIS ARRAY OR SET IT DIRECTLY UNLESS YOU KNOW WHAT YOU ARE DOING!!!**

###Metohds

* `#addChild(child)`: Adds `child` to the game. Every time update and render is called for the engine, `render` and `update` methods will be called for every `children` within the engine. The `child` must be a `GameObject`, a [Module](#modules), or any object derived from `GameObject` (will be checked using `instaceof`)

* `#removeChild(child)`: Removes `child` from the engine, so it wont *render* or *update* until it is on the engine again.

* <a name="Engine.start"></a>`#start()`: Start the game. 

* `#pause()`: Pauses the game. By default the game pauses when canvas loose focus unless you say no (`game.pauseOnBlur = false`).

* `#resume()`: Resumes the game.

* `#getInput()`: Return the current input of the user in an [`Input`](#input) object.

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

You read about them above, they are object made to work together in the game and interact. That way you can reduce your game logic to just objects interacting with each other. Every time the engine renders and updates, the `GameObject`s children of the engine methods render and update respectively will be called.

A `GameObject` can be made this way: `new Trios2D.GameObject()`.

A game object has a `position` which is a `Vector` and is relative to the parent.

This is what a `GameObject` looks like:

```javascript
var gameObject = new Trios2D.GameObject();

gameObject.update = function update(delta) { // Here you put the update logic of your object.
    updateObject(delta);                     // delta is the time since the last update

};

gameObject.render = function render(context, parentPosition) { // Here you put the render logic of your object.
    renderObject(context, this.absolutePosition);              // context is the canvas context where you would render
                                                               // parentPosition is an vector with the position of the parent
};

gameObject.addChild(child);
```

Here we can se some other things not mentioned in the coment. First the `#addChild` method. This method adds a `GameObject` into a `GameObject`. Second is the `this.absolutePosition`. We will cver it later.

###Instance Variables

* `position`: Is an `Vector` indicating the object position relative to it's parents. If you want to move it right just add to the vector x and thats it.

* `size`: Is an `Vector` indicating the width (`x`) and height (`y`) of the `GameObject`.

* `renderPosition`: Indicates the render priotity of the `GameObject` and that way if it is in the front or the back. Higher values means that is more on the front. By default 0.

* <a name="GameObject.children"></a>`childen`: Is an array containing all the `GameObject` objects that are children of the `GameObject`. **DO NOT MODIFY THIS ARRAY OR SET IT DIRECTLY UNLESS YOU KNOW WHAT YOU ARE DOING!!!**

* `components`: Is an array containing all `Component` (See more about `Component` [here](#components)) which belongs to the `GameObject`. **DO NOT MODIFY THIS ARRAY OR SET IT DIRECTLY UNLESS YOU KNOW WHAT YOU ARE DOING!!!**


###Methods

* `#addChild(child)`: Adds `child` to the `GameObject`. Every time update and render is called for the `GameObject`, `render` and `update` methods will be called for every `children` within the object. The `child` must be a `GameObject`, a [Module](#modules), or any object derived from `GameObject` (will be checked using `instaceof`)

* `#removeChild(child)`: Removes `child` from the `GameObject`, so it wont *render* or *update* until it is on the `GameObject` or the engine directly again.

* `#addComponent(component)`: Adds `component` to the `GameObject`. More in components [here](#components).

* `#removeComponent(component)`: Removes `component` from the `GameObject`. More in components [here](#components).

* `autoCalcSize()`: Calculates, set and return the size of the `GameObject` based on the sizer ans positions of it's childs. Util with collisions boxes when the object has no defined size but it has childs with does.


###Input

It is an object that contains the input from the user. To know if a key is down, you must call `#isKeyDown(code)` where code is the key code. It returns true if that key is down, else false.

Other methods are:

* `#isKeyUp(code)`: Returns true if the key was released during the update. Else false.

* `#isKeyUp(code)`: Returns true if the key was pressed. Else false.

####Available keys

For convenience of the programer, key codes are available as variables. You can acces to these key codes like this: `Trios2D.Input.key`.

Available Keys:

| Name               | Description                         | Value |
| ------------------ | ----------------------------------- | :---: |
| `ANY`              | Any key                             | -1    |
| `BACKSPACE`        | Backspace key                       | 8     |
| `TAB`              | Tab key                             | 9     |
| `ENTER`            | Enter/Return key                    | 13    |
| `SHIFT`            | Shift key                           | 16    |
| `CTRL`             | Control key                         | 17    |
| `ALT`              | Alt key                             | 18    |
| `PAUSE`            | Pause/Interrupt key                 | 19    |
| `CAPS_LOCK`        | Caps Lock key                       | 20    |
| `ESCAPE`           | Escape (esc) key                    | 27    |
| `PAGE_UP`          | Page Up key                         | 33    |
| `PAGE_DOWN`        | Page Down key                       | 34    |
| `END`              | End key                             | 35    |
| `HOME`             | Home key                            | 36    |
| `LEFT_ARROW`       | Left arrow (←) key                  | 37    |
| `UP_ARROW`         | Up arrow (↑) key                    | 38    |
| `RIGHT_ARROW`      | Right arrow (→) key                 | 39    |
| `DOWN_ARROW`       | Down arrow (↓) key                  | 40    |
| `INSERT`           | Insert key                          | 45    |
| `DELETE`           | Delete key                          | 46    |
| `KB_0`             | Normal 0 key                        | 48    |
| `KB_1`             | Normal 1 key                        | 49    |
| `KB_2`             | Normal 2 key                        | 50    |
| `KB_3`             | Normal 3 key                        | 51    |
| `KB_4`             | Normal 4 key                        | 52    |
| `KB_5`             | Normal 5 key                        | 53    |
| `KB_6`             | Normal 6 key                        | 54    |
| `KB_7`             | Normal 7 key                        | 55    |
| `KB_8`             | Normal 8 key                        | 56    |
| `KB_9`             | Normal 9 key                        | 57    |
| `A`                | A key                               | 65    |
| `B`                | B key                               | 66    |
| `C`                | C key                               | 67    |
| `D`                | D key                               | 68    |
| `E`                | E key                               | 69    |
| `F`                | F key                               | 70    |
| `G`                | G key                               | 71    |
| `H`                | H key                               | 72    |
| `I`                | I key                               | 73    |
| `J`                | J key                               | 74    |
| `K`                | K key                               | 75    |
| `L`                | L key                               | 76    |
| `M`                | M key                               | 77    |
| `N`                | N key                               | 78    |
| `O`                | O key                               | 79    |
| `P`                | P key                               | 80    |
| `Q`                | Q key                               | 81    |
| `R`                | R key                               | 82    |
| `S`                | S key                               | 83    |
| `T`                | T key                               | 84    |
| `U`                | U key                               | 85    |
| `V`                | V key                               | 86    |
| `W`                | W key                               | 87    |
| `X`                | X key                               | 88    |
| `Y`                | Y key                               | 89    |
| `Z`                | Z key                               | 90    |
| `LEFT_WINDOW_KEY`  | Right Windows key (if applys)       | 91    |
| `RIGHT_WINDOW_KEY` | Left Windows key (if applys)        | 92    |
| `NUMPAD_0`         | Numbad 0 key                        | 96    |
| `NUMPAD_1`         | Numbad 1 key                        | 97    |
| `NUMPAD_2`         | Numbad 2 key                        | 98    |
| `NUMPAD_3`         | Numbad 3 key                        | 99    |
| `NUMPAD_4`         | Numbad 4 key                        | 100   |
| `NUMPAD_5`         | Numbad 5 key                        | 101   |
| `NUMPAD_6`         | Numbad 6 key                        | 102   |
| `NUMPAD_7`         | Numbad 7 key                        | 103   |
| `NUMPAD_8`         | Numbad 8 key                        | 104   |
| `NUMPAD_9`         | Numbad 9 key                        | 105   |
| `MULTIPLY`         | Multyply key (*) on the numpad      | 106   |
| `ADD`              | Addition key (+) on the numpad      | 107   |
| `SUBTRACT`         | Substraction key (-) on the numpad  | 109   |
| `DECIMAL_POINT`    | Decimal Point key (.) on the numpad | 110   |
| `DIVIDE`           | Division key (/) on the numpad      | 111   |
| `F1`               | F1 function key                     | 112   |
| `F2`               | F2 function key                     | 113   |
| `F3`               | F3 function key                     | 114   |
| `F4`               | F4 function key                     | 115   |
| `F5`               | F5 function key                     | 116   |
| `F6`               | F6 function key                     | 117   |
| `F7`               | F7 function key                     | 118   |
| `F8`               | F8 function key                     | 119   |
| `F9`               | F9 function key                     | 120   |
| `F10`              | F10 function key                    | 121   |
| `F11`              | F11 function key                    | 122   |
| `F12`              | F12 function key                    | 123   |
| `COMMA`            | Comma (,) key                       | 188   |
| `DASH`             | Dash (-) key                        | 189   |
| `PERIOD`           | Period (.) key                      | 190   |
| `SINGLE_QUOTE`     | Single Quote (') key                | 222   |

###Camera

`Camera` object is made to manage the view point pof the game, giving to id a "camera", which you point to a position and in the canvas you can see what the "camera" sees. By default, the camera is seeing at the point (0,0). You can change the position where the `Camera` is by setting the `position` variable to a vector of the new position. 


##Modules

Trios2D has modules built in, making easy thing like images managing or animations. It isn't very complete yet, but it is growing. All the modules are Game Objects and you can treat them as it. Modules are in the `./modules` folder.

###Some Modules

####GameImage

It is a module to manage images. It implements the render and update methods so you just have to specify the image and the size and it will make the work for you.

To use it you must import the `./modules/GameImage.js` script.

```html
<script src="js/Trios2D.js"></script>
...
<script src="js/modules/GameImage.js"></script>
```

To make a new image use `new Trios2D.GameImage(image, size)` where image is an `HTMLImage` Object or a source string. If the browser supports data url GameImage too. The `size` is an `Vector` object, an object containing `{x: 0, y: 0}` or even an array `[x, y]`.

If you are working with sprites you can make the `GameImage` this way: `new Trios2D.GameImage(image, clipStart, size)`. Here `clipStart` is where to start trimming the image, and the size is how much to trim. The same as `size`, `clipStart`can be a `Vector` and object or an array.

Heres some examples of using `GameImage` module:

```javascript
var image1 = new Trios2D.GameImage("/res/images/car.jpg", new Trios2D.Vector(330, 150));

var htmlImage = document.querySelector("img#wheel");

var image2 = new Trios2D.GameImage(htmlImage, [20, 20]);

var image3 = new Trios2D.GameImage("/res/images/spritesheet.png, [10, 200], {x:100, y:100});

image1.addChild(image2); // This is ok since every module is an GameObject too

game.addChild(image1); // Ok because it is a game object, are made for this.
game.addChild(image3);
```

All these ways are ok.

#####Intance Variables

* `image`: The `HTMLImage` which is rendered by the `GameImage` module.

* `originalSize`: An `Vector` representig the real size of the image or how much of it will be rendered.

* `clipStart`: An `Vector` representing from where the image will be renderer (where the triming start). If not specified in the constructor it is default to (0,0).

* `scale`: How much scaling the image has when rendering. 1 is normal, 0.1 is 10% of it size and 2 is 2x size. Default to 1.

* `size`: Overwritten from GameObject. Is a get-only property which return the size of the image in the canvas.

####GameText

It is a module to manage text rendering. It giives cappabilities to render test with your desired font, size, color, alignment and other thing thar are normaly messi when rendering text on canvas.

To use it you must import the `./modules/GameText.js` script.

```html
<script src="js/Trios2D.js"></script>
...
<script src="js/modules/GameText.js"></script>
```

Here an example of how to use it:

```javascript
var text = new Trios2D.GameText("I am rendering :)", options);

text.position = new Trios2D.Vector(20, 20);

game.addChild(text);
```

Where options is an object containig information about how to render the text. here a list of posible options:

* `size`: The font size of the text to render. Default to 10.

* `font_family`: The font family of the text to render. Can be set like the css rule `font-family`. Defaults to `"sans-serif"`.

* `font_misc`: Other font properties, separated by spaces. An Example would be `"bold italic"`.

* `textAlign`: See canvas' `textAlign` on [W3Schools](http://www.w3schools.com/tags/canvas_textalign.asp).

* `baselineAlign`: See canvas' `baselineAlign` on [W3Schools](http://www.w3schools.com/tags/canvas_textbaseline.asp).

* `drawMode`: Specifies if the text will be rendered by filling the text on canvas, stroking the text or both. Posible values are `"fill"`, `"stroke"`, and `"fillNStroke"`, where `"fillNStroke"` first fills the text and then strokes.

* `color`: Defines the filling color of the text. Defaults to the current value setted in the context.

* `strokeColor`: Defines the stroking color of the text. Defaults to the current value setted in the context.

* `strokeWidth`: Defines the width of the stroke . Defaults to the current value setted in the context.


##Components

//TODO: Speak about components
