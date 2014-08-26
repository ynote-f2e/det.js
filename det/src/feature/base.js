det.BaseFeature = (function (EventSupport) {

    'use strict';

    return EventSupport.derive({

        getCtrl : function () {
            return this.ctrl;
        },

        active : function (ctrl) {
            this.ctrl = ctrl;
            this.onActive();
        },

        deactive : function () {
            this.onDeactive();
            delete this.ctrl;
        },

        onActive : det.noop,

        onDeactive : det.noop

    });

}(det.EventSupport));