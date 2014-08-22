det.Model = (function (EventSupport) {
    'use strict';

    return EventSupport.derive({
        triggerChanged : function () {
            this.trigger(det.Model.CHANGED, this);
        },
        bindChange : function (listener, scope) {
            this.on(det.Model.CHANGED, listener, scope);
        },
        unbindChange : function (listener) {
            this.off(det.Model.CHANGED, listener);
        }
    }, {
        CHANGED : 'propertychanged'
    });

}(det.EventSupport));