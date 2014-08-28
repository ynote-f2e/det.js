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

        render : function () {
            DiagramCtrl.prototype.render.apply(this, arguments);
            this.doLayout();
        },

        /**
         * @Override
         * */
        refreshFigure : function () {},

        /**
         * @Override
         * */
        getModelChildren : function () {
            var model = this.getModel();
            return [model.root];
        },

        doLayout : function () {
            var t1 = new Date().getTime() / 1000;
            this.layout.doLayout();
            console.log('layout', new Date().getTime() / 1000 - t1);
        },

        getRootCtrl : function () {
            return this.children[0];
        }
    });

}(det.DiagramCtrl));