/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, BaseCtrl) {
        'use strict';

        return GraphCtrl.derive(function (model, factory) {
            GraphCtrl.call(this, model, factory);
            this.pos = {
                x : 0,
                y : 0
            };
            this.installFeature(new (MindSelection.derive({
                highlight : true,
                getBody : function () {
                    return this.rect.getFigure();
                }.bind(this)
            })));
            this.installFeature(new (DragMove.derive({
                getFigure : function () {
                    return this.rect.getFigure();
                }.bind(this)
            })));
        }, {

            /**
             * @Override
             * */
            createFigure : function () {
                var svg = this.getSVG(),
                    paper = svg.paper,
                    model = this.getModel(),
                    text = model.get('text'),
                    node;

                //start from 0
                if (this.isRoot()){
                    this.depth = 0;
                } else {
                    this.depth = this.getParent().depth + 1;
                }

                if (this.getDepth() === 0 || this.getDepth() === 1) {
                    this.rect= Style.getRect('normal', this);
                    this.rect.create();
                } else {
                    this.rect= Style.getRect('underline', this);
                    this.rect.create();
                }

                if (this.getDepth() <= 1) {
                    this.line = Style.getLine('firstLevel', this);
                    this.line.create();
                } else if (this.getDepth() === 2){
                    this.line = Style.getLine('secondLevel', this);
                    this.line.create();
                } else {
                    this.line = Style.getLine('otherLevel', this);
                    this.line.create();
                }

                this.renderProperties();

                node = this.rect.getFigure().node;
                node.addEventListener('click',
                    this.bubbleEvent.bind(this, 'click'));
                node.addEventListener('contextmenu',
                    this.bubbleEvent.bind(this, 'contextmenu'));
                node.addEventListener('dblclick',
                    this.bubbleEvent.bind(this, 'dblclick'));

                return svg.group(this.rect.getFigure(), this.line.getFigure());
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
                    lineAttr;

                this.rect.refresh();

                if (this.isRoot()) {
                    return;
                }

                this.line.refresh();
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
                this.bind('append', this.doLayout, this);
                this.bind('remove', this.doLayout, this);
            },

            /**
             * @Override
             * */
            onDetach : function () {
                GraphCtrl.prototype.onDetach.call(this);
                this.unbind('append', this.doLayout);
                this.unbind('remove', this.doLayout);
                this.line.getFigure().remove();
            },

            isRoot : function () {
                var model = this.getModel(),
                    diagramCtrl = this.getDiagram();
                if (!diagramCtrl) {
                    return false;
                }
                return model === diagramCtrl.getModel().getRoot();
            },

            getDepth : function () {
                return this.depth;
            },

            /**
             * @Override
             */
            execute : function (cmd) {
                var layout = this.getLayout();
                layout.beginUpdate();
                GraphCtrl.prototype.execute.call(this, cmd);
                layout.finishUpdate();
            },

            isSecond : function () {
                var model = this.getParent().getModel(),
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
                this.getLayout().layout();
            },

            getLayout : function () {
                return this.getDiagram().getLayout();
            },

            getRect : function () {
                return this.rect.getRect();
            },

            getText : function () {
                return this.rect.getText();
            },

            getLine : function () {
                return this.line.getLine();
            },

            getBBox : function () {
                return this.rect.getBBox();
            },

            setXY : function (x, y) {
                this.rect.setXY(x, y);
                if (this.isRoot()) {
                    return;
                }
                this.line.setXY(x, y);
            },

            onSelect : function () {
                var paper = this.getSVG().paper,
                    box = this.rect.getBBox();
                this.selectRect = paper.rect({
                    x : box.x - 3,
                    y : box.y - 3,
                    rx : 6,
                    ry : 6,
                    width : box.width + 6,
                    height : box.height + 6,
                    fill : 'none',
                    strokeOpacity : 0.4,
                    stroke : 'blue',
                    strokeWidth : '3'
                });
                this.getFigure().append(this.selectRect);
            },

            onDeselect : function () {
                if (this.selectRect) {
                    this.selectRect.remove();
                    delete this.selectRect;
                }
            },

            bubbleEvent : function (name, e) {
                var event = this.bubble(name, {
                    pageX : e.pageX,
                    pageY :e.pageY,
                    button : e.button
                });
                if (event.isDefaultPrevented()) {
                    e.preventDefault();
                }
            }

        });

    }(det.GraphCtrl, det.BaseCtrl)
);