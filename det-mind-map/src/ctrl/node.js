/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, BaseCtrl) {
        'use strict';

        function extend(src, obj) {
            var copy = src.constructor();
            for (var attr in src) {
                if (src.hasOwnProperty(attr)) {
                    copy[attr] = src[attr];
                }
            }
            for(var attr in obj) {
                copy[attr] = obj[attr];
            }
            return copy;
        };

        var PADDING = {
                X : 10,
                Y : 6
            },
            DEFAULTRECTATTR = {
                fill : '#fff',
                stroke : "#666",
                strokeWidth : '1',
                rx : 8,
                ry : 8
            },
            DEFAULTTEXTATTR = {
                'text-anchor' : 'start'
            },
            DEFAULTLINEATTR = {
                stroke : "#666",
                strokeWidth : '1'
            };
        

        return GraphCtrl.derive(function (model, factory) {
            GraphCtrl.call(this, model, factory);
            this.installFeature(new MindNodeSelection());
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
                    textBox,
                    textAttr,
                    rectAttr,
                    lineAttr;
                textNode.textContent = model.get('text');
                
                textAttr = extend(DEFAULTTEXTATTR, model.data.textAttr);
                this.text.attr(textAttr);

                textBox = this.text.getBBox();
                width = textBox.width + PADDING.X * 2;
                height = textBox.height + PADDING.Y * 2;

                rectAttr = extend(extend(DEFAULTRECTATTR, {width: width, height: height}), 
                                model.data.rectAttr);
                this.rect.attr(rectAttr);

                if (this.isRoot()) {
                    return;
                }

                lineAttr = extend(DEFAULTLINEATTR, model.data.lineAttr);
                this.line.attr(lineAttr);
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
                this.bind(BaseCtrl.CHILD_ADD, this.doLayout, this);
                this.bind(BaseCtrl.CHILD_REMOVE, this.doLayout, this);
            },

            /**
             * @Override
             * */
            onDetach : function () {
                GraphCtrl.prototype.onDetach.call(this);
                this.getParent().getModel().unbind(this.refreshFigure, this);
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