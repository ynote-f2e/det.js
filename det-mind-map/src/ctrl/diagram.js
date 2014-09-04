/**
 * 思维导图的根节点对应的控制器
 */
var MindDiagramCtrl = (function (DiagramCtrl) {
    'use strict';

    return DiagramCtrl.derive(function (model, factory) {
        DiagramCtrl.call(this, model, factory);
        this.layout = new MindLayout();
        this.installFeature(this.layout);
        this.installFeature(new (MindSelection.derive({
            highight : false,
            getBody : function () {
                return this.getFigure();
            }.bind(this)
        })));
    }, {

        /**
         * @Override
         * */
        createFigure : function () {
            var svg = this.getSVG(),
                paper = svg.paper;
            return svg.group(paper.rect({
                x : 0,
                y : 0,
                width : '100%',
                height : '100%',
                fill : this.getModel().get('bgColor') || '#fff'
            }));
        },

        render : function () {
            //this.getLayout().beginUpdate();
            DiagramCtrl.prototype.render.apply(this, arguments);
            //this.getLayout().finishUpdate();
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