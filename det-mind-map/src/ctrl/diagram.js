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
            var svg = this.getSVG(),
                paper = svg.paper,
                viewWidth = svg.node.offsetWidth,
                viewHeight = svg.node.offsetHeight;
            return paper.rect({
                x : 0,
                y : 0,
                width : viewWidth,
                height : viewHeight,
                fill : '#eeeef6'
            });
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