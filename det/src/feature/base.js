det.BaseFeature = (function (det) {

    'use strict';

    return det.derive(function (config) {
        var name;
        for (name in config) {
            if (config.hasOwnProperty(name)) {
                this[name] = config[name];
            }
        }
    }, {

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

}(det));