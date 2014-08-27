det.SelectionFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        selected : false,

        onAttach : function () {
            var figure = this.getCtrl().getFigure();
            figure.mousedown(this.onMouseDown.bind(this));
        },

        onDetach : function () {

        },

        onMouseDown : function (e) {
            if (this.selected) {
                return;
            }
            this.onSelect();
        },

        onSelect : det.noop,

        onDeselect : det.noop,

        onHover : det.noop,

        unHover : det.noop

    });

}(det.BaseFeature));