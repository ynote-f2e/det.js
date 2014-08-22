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
        }

    }, {
        EVENT_CHANGED : 'propertychanged'
    });

}(det.EventSupport));