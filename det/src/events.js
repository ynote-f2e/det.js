det.EventSupport = (function (det) {
    'use strict';

    return det.derive(function () {
        this.events = {};
    }, {
        bind : function (eventName, listener, scope) {
            if (!this.events[eventName]) {
                this.events[eventName] = [];
            }
            if (this.events[eventName].indexOf(listener) >= 0) {
                return;
            }
            listener.scope = scope;
            this.events[eventName].push(listener);
        },
        unbind : function (eventName, listener) {
            var index;
            if (!this.events[eventName]) {
                return;
            }
            index = this.events[eventName].indexOf(listener);
            if (index == -1) {
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
        trigger : function (eventName, event) {
            if (!this.events[eventName]) {
                return;
            }
            this.events[eventName].forEach(function (listener) {
                if (listener.scope) {
                    listener.call(listener.scope, event);
                }
                listener(event);
            });
        }
    });

}(det));