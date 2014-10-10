(function (window) {
    "use strict";
    var Utils = window.Utils = window.Utils || {};
    
    Utils.clone = function clone(object) {
        var theClone = {}, prop;
        for (prop in object) {
            if (typeof object[prop] !== "object") {
                theClone[prop] = object[prop];
            } else {
                theClone[prop] = clone(object[prop]);
            }
        }
        
        return theClone;
    };
    
    Utils.pad = function pad(n, width, z) {
        z = z || ' ';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }
}(window));