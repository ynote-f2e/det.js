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
            ctrl.select();
            selection.forEach(function (selected) {
                if (selected === ctrl) {
                    return;
                }
                selected.deselect();
            });
        }

    });



}(det.BaseFeature));