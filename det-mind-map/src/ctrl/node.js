/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, DragDropFeature, SelectionFeature,
          MoveCommand) {
        'use strict';

        var PADDING = {
            X : 20,
            Y : 12
        };

        return GraphCtrl.derive(function (model) {
            GraphCtrl.call(this, model);
            //this.installFeature(new DragMove());
            this.installFeature(this.layout = new MindLayout());
        }, {

            /**
             * @Override
             * */
            createFigure : function () {
                if (this.isRoot()) {
                    return this.createAsRoot();
                }
                return this.createAsChild();
            },

            /**
             * @Override
             * */
            refreshFigure : function () {
                this.applyAll();
                if (!this.isRoot()) {
                    return;
                }
                this.layout.doLayout();
            },

            /**
             * @Override
             * */
            getModelChildren : function () {
                var model = this.getModel();
                return model.nodes;
            },

            /**
             * @Override
             * */
            onAttach : function () {
                GraphCtrl.prototype.onAttach.call(this);
                this.getParent().getModel().bind(this.refreshFigure, this);
            },

            /**
             * @Override
             * */
            onDetach : function () {
                GraphCtrl.prototype.onDetach.call(this);
                this.getParent().getModel().unbind(this.refreshFigure, this);
            },

            createAsRoot : function () {
                var svg = this.getSVG(),
                    paper = svg.paper,
                    model = this.getModel(),
                    text = model.get('text');
                this.text = paper.text(0, 0, text);
                this.rect = paper.rect(0, 0, 0, 0);
                this.applyAll();
                return svg.group(this.rect, this.text);
            },

            createAsChild : function () {
                var svg = this.getSVG(),
                    paper = svg.paper,
                    model = this.getModel(),
                    text = model.get('text');
                this.rect = paper.rect(0, 0, 0, 0);
                this.text = paper.text(0, 0, text);
                this.line = paper.line(0, 0, 0, 0);
                this.applyAll();
                return svg.group(this.rect, this.text);
            },

            applyAll : function () {
                var model = this.getModel(),
                    textNode = this.text.node,
                    width,
                    height,
                    textBox;
                textNode.textContent = model.get('text');
                textBox = this.text.getBBox();
                width = textBox.width + PADDING.X * 2;
                height = textBox.height + PADDING.Y * 2;
                this.rect.attr({
                    fill : '#fff',
                    stroke : "#666",
                    strokeWidth : '1',
                    rx : 8,
                    ry : 8,
                    width : width,
                    height : height
                });
                this.text.attr({
                    'x' : width / 2,
                    'y' : height - PADDING.Y,
                    'text-anchor' : 'middle'
                });
            },

            isRoot : function () {
                var model = this.getModel(),
                    diagramCtrl = this.getDiagram();
                if (!diagramCtrl) {
                    return false;
                }
                return model === diagramCtrl.getModel().getRoot();
            },

            getRootCtrl : function () {
                var diagramCtrl = this.getDiagram();
                if (!diagramCtrl) {
                    return null;
                }
                return diagramCtrl.getChildren()[0];
            },

            getLayout : function () {
                return this.layout;
            }

        });

    }(det.GraphCtrl, det.DragDropFeature, det.SelectionFeature,
        detMindMap.MoveCommand)
);