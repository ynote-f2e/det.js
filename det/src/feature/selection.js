det.SelectionFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        onActive : function () {
            var figure = this.getCtrl().getFigure();
            figure.mousedown(this.onMouseDown.bind(this));
        },

        onMouseDown : function (e) {

        },

        onSelect : det.noop,

        onDeselect : det.noop,

        onHover : det.noop,

        unHover : det.noop

    });

}(det.BaseFeature));