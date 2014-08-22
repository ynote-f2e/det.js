var MindDiagramCtrl = (function (DiagramCtrl) {
    'use strict';

    return DiagramCtrl.derive({

        createFigure : function () {
            return this.getSVG();
        },

        refreshFigure : function () {
            // maybe resize the svg
        },

        getModelChildren : function () {
            var model = this.getModel();
            return [model.root];
        }

    });

}(det.DiagramCtrl));

detMindMap.MindDiagramCtrl = MindDiagramCtrl;