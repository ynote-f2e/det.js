/**
 * 思维导图的根节点对应的控制器
 */
var MindDiagramCtrl = (function (DiagramCtrl) {
    'use strict';

    return DiagramCtrl.derive(function (model, factory) {
        DiagramCtrl.call(this, model, factory);
        this.installFeature(this.layout = new MindLayout());
    }, {

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
            this.doLayout();
        },

        /**
         * @Override
         * */
        getModelChildren : function () {
            var model = this.getModel();
            return [model.root];
        },

        doLayout : function () {
            this.layout.doLayout();
        },

        getRootCtrl : function () {
            return this.children[0];
        }
    });

}(det.DiagramCtrl));