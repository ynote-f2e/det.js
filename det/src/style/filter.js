det.Filter = (function (det) {

    return det.derive(function (ctrl, name) {
        this.ctrl = ctrl;
        this.name = name;
    }, {

        getCtrl : function() {
            return this.ctrl;
        },

        getName : function () {
            return this.name;
        },

        doFilter : det.noop

    });


}(det))