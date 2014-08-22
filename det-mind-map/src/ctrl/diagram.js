/**
 * 思维导图的根节点对应的控制器
 */
var MindDiagramCtrl = (function (DiagramCtrl) {
    'use strict';

    return DiagramCtrl.derive({

        /**
         * @Override
         * */
        createFigure : function () {
            return this.getSVG();
        },

        /**
         * @Override
         * */
        refreshFigure : function () {
            // maybe resize the svg
        },

        /**
         * @Override
         * */
        getModelChildren : function () {
            var model = this.getModel();
            return [model.root];
        }

    });

}(det.DiagramCtrl));

detMindMap.MindDiagramCtrl = MindDiagramCtrl;