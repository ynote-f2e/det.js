/**
 * 思维导图的根节点对应的控制器
 */
var MindDiagramCtrl = (function (DiagramCtrl) {
    'use strict';

    return DiagramCtrl.derive(function (model, factory) {
        DiagramCtrl.call(this, model, factory);
        this.layout = new MindLayout();
        this.installFeature(this.layout);
        this.installFeature(new MindSelection());
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
                fill : '#f3f3f3'
            });
        },

        render : function () {
            DiagramCtrl.prototype.render.apply(this, arguments);
            this.getLayout().layout();
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

        getLayout : function () {
            return this.layout;
        },

        getRootCtrl : function () {
            return this.children[0];
        },

        undo : function () {
            this.layout.beginUpdate();
            DiagramCtrl.prototype.undo.call(this);
            this.layout.finishUpdate();
        },

        redo : function () {
            this.layout.beginUpdate();
            DiagramCtrl.prototype.redo.call(this);
            this.layout.finishUpdate();
        }

    });

}(det.DiagramCtrl));