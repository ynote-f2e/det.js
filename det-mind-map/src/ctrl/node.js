/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, BaseCtrl) {
        'use strict';

        var PADDING = {
                X : 20,
                Y : 12
            };

        return GraphCtrl.derive(function (model, factory) {
            GraphCtrl.call(this, model, factory);
            this.installFeature(new MindSelection());
        }, {

            /**
             * @Override
             * */
            createFigure : function () {
                var svg = this.getSVG(),
                    paper = svg.paper,
                    model = this.getModel(),
                    text = model.get('text');
                this.rect = paper.rect(0, 0, 0, 0);
                this.text = paper.text(0, 0, text);
                this.line = paper.line(0, 0, 0, 0);
                this.renderProperties();
                this.text.attr({
                    x : PADDING.X,
                    y : this.rect.getBBox().height - PADDING.Y - 4
                });
                return svg.group(this.rect, this.text);
            },

            refreshFigure : function () {
                this.renderProperties();
                this.doLayout();
            },

            /**
             * @Override
             * */
            renderProperties : function () {
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
                    'text-anchor' : 'start'
                });
                if (this.isRoot()) {
                    return;
                }
                this.line.attr({
                    stroke : "#666",
                    strokeWidth : '1'
                });
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
                this.bind(BaseCtrl.CHILD_ADD, this.doLayout, this);
                this.bind(BaseCtrl.CHILD_REMOVE, this.doLayout, this);
            },

            /**
             * @Override
             * */
            onDetach : function () {
                GraphCtrl.prototype.onDetach.call(this);
                this.line.remove();
                this.unbind(BaseCtrl.CHILD_ADD, this.doLayout);
                this.unbind(BaseCtrl.CHILD_REMOVE, this.doLayout);
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

            doLayout : function () {
                this.getDiagram().doLayout();
            },

            getSize : function () {
                var box = this.text.getBBox();
                return {
                    width : box.width + PADDING.X * 2,
                    height : box.height + PADDING.Y * 2
                };
            },

            setXY : function (x, y) {
                var parentBox,
                    box;
                this.rect.attr({
                    x : x,
                    y : y
                });
                this.text.attr({
                    x : x + PADDING.X,
                    y : y + this.rect.getBBox().height - PADDING.Y - 4
                });
                if (this.isRoot()) {
                    return;
                }
                parentBox = this.getParent().getFigure().getBBox();
                box = this.getFigure().getBBox();
                if (parentBox.x < box.x) {
                    this.line.attr({
                        x1 : x,
                        y1 : y + box.height / 2,
                        x2 : parentBox.x + parentBox.width,
                        y2 : parentBox.y + parentBox.height / 2
                    });
                } else {
                    this.line.attr({
                        x1 : x + box.width,
                        y1 : y + box.height / 2,
                        x2 : parentBox.x,
                        y2 : parentBox.y + parentBox.height / 2
                    });
                }
                if (this.selectRect) {
                    this.selectRect.attr({
                        x : box.x - 4,
                        y : box.y - 4,
                        width : box.width + 8,
                        height : box.height + 8
                    });
                }
            },

            onSelect : function () {
                var paper = this.getSVG().paper,
                    box = this.getFigure().getBBox();
                this.selectRect = paper.rect({
                    x : box.x - 4,
                    y : box.y - 4,
                    rx : 8,
                    ry : 8,
                    width : box.width + 8,
                    height : box.height + 8,
                    fillOpacity : 0,
                    strokeOpacity : 0.5,
                    stroke : 'blue',
                    strokeWidth : '3'
                });
            },

            onDeselect : function () {
                if (this.selectRect) {
                    this.selectRect.remove();
                    delete this.selectRect;
                }
            }

        });

    }(det.GraphCtrl, det.BaseCtrl)
);