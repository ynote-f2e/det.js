var det = {
    version : '0.0.1'
};

(function () {
    'use strict';

    var idSequence = 0;

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define('det', [], function () {
            return det;
        });
    } else {
        window.det = det;
    }

    det.derive = function (constructor, prototype) {
        return derive(Object, function () {
            constructor.apply(this, arguments);
            var id = idSequence++;
            this.$id = function () {
                return id;
            };
        }, prototype);
    };

    function derive(superclass, constructor, prototype, statics) {
        constructor.prototype = Object.create(superclass.prototype);
        det.mixin(constructor.prototype, prototype || {});
        constructor.prototype.constructor = constructor;
        constructor.derive = function (subclass, prototype, statics) {
            var superclass = this;
            if (typeof subclass === 'object') {
                statics = prototype;
                prototype = subclass;
                subclass = function () {
                    superclass.apply(this, arguments);
                };
            }
            return derive(this, subclass, prototype, statics);
        };
        det.mixin(constructor, statics || {});
        return constructor;
    }

    det.mixin = function (obj, obj2) {
        var name;
        for (name in obj2) {
            if (obj2.hasOwnProperty(name)) {
                obj[name] = obj2[name];
            }
        }
    };

    det.noop = function noop() {};

    det.abstract = function abstractMethod() {
        throw 'Subclass must implements this method.';
    };

}());

