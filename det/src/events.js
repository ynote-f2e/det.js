det.EventSupport = (function (det) {
    'use strict';

    return det.derive(function () {
        this.events = {};
    }, {
        bind : function (eventName, listener, scope) {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            if (this.events[eventName].every(function (event) {
                    return event.fn !== listener || event.scope !== scope;
                })) {
                this.events[eventName].push({
                    fn : listener,
                    scope : scope
                });
            }
        },
        unbind : function (eventName, listener) {
            var index = -1;
            if (!this.events[eventName]) {
                return;
            }
            this.events[eventName].forEach(function (event, pos) {
                if (event.fn == listener) {
                    index = pos;
                }
            });
            if (index === -1) {
                return;
            }
            this.events[eventName].splice(index, 1);
        },
        on : function () {
            return this.bind.apply(this, arguments);
        },
        off : function () {
            return this.unbind.apply(this, arguments);
        },
        trigger : function (eventName, value) {
            if (!this.events[eventName]) {
                return;
            }
            this.events[eventName].forEach(function (event) {
                if (event.scope) {
                    event.fn.call(event.scope, value);
                } else {
                    event.fn(value);
                }
            });
        }
    });

}(det));