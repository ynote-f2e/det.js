det.Model = (function (EventSupport) {
    'use strict';

    return EventSupport.derive({

        trigger : function (name, value) {
            if (name && value) {
                EventSupport.prototype.trigger
                    .call(this, name, value);
                return;
            }
            this.trigger(det.Model.EVENT_CHANGED, this);
        },

        triggerChildren : function () {
            this.trigger(det.Model.EVENT_CHILD_CHANGED, this);
        },

        bind : function (name, listener, scope) {
            if (typeof name === 'string') {
                EventSupport.prototype.bind
                    .call(this, name, listener, scope);
                return;
            }
            scope = listener;
            listener = name;
            name = det.Model.EVENT_CHANGED;
            EventSupport.prototype.bind
                .call(this, name, listener, scope);
        },

        bindChildren : function (listener, scope) {
            this.bind(det.Model.EVENT_CHILD_CHANGED, listener, scope);
        },

        unbind : function (name, listener) {
            if (typeof name === 'string') {
                EventSupport.prototype.unbind
                    .call(this, name, listener);
                return;
            }
            listener = name;
            name = det.Model.EVENT_CHANGED;
            EventSupport.prototype.bind
                .call(this, name, listener);
        },

        unbindChildren : function (listener) {
            this.unbind(det.Model.EVENT_CHILD_CHANGED, listener);
        }

    }, {
        EVENT_CHANGED : 'propertychanged',
        EVENT_CHILD_CHANGED : 'childchanged'
    });

}(det.EventSupport));