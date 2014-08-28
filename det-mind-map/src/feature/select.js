var MindSelection = (function (BaseFeature) {
    'use strict';

    return BaseFeature.derive({

        onAttach : function () {
            var ctrl = this.getCtrl(),
                figure = ctrl.getFigure();
            if (!this.binded) {
                this.select = this.select.bind(this);
                this.binded = true;
            }
            figure.mousedown(this.select);
        },

        onDetach : function () {
            var ctrl = this.getCtrl(),
                figure = ctrl.getFigure();
            figure.unmousedown(this.select);
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