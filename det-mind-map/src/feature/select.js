var MindNodeSelection = (function (BaseFeature) {
    'use strict';

    return BaseFeature.derive({

        onAttach : function () {
            var ctrl = this.getCtrl(),
                figure = ctrl.getFigure();
            figure.mousedown(this.select.bind(this));
        },

        select : function () {
            var ctrl = this.getCtrl(),
                selection = ctrl.getDiagram().getSelection();
            selection.forEach(function (ctrl) {
                ctrl.deselect();
            });
            ctrl.select();
        }

    });



}(det.BaseFeature));