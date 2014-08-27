det.BaseFeature = (function (EventSupport) {

    'use strict';

    return EventSupport.derive({

        getCtrl : function () {
            return this.ctrl;
        },

        active : function (ctrl) {
            this.ctrl = ctrl;
            this.onAttach();
        },

        deactive : function () {
            this.onDetach();
            delete this.ctrl;
        },

        onAttach : det.noop,

        onDetach : det.noop

    });

}(det.EventSupport));