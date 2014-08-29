/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, BaseCtrl) {
        'use strict';

        return GraphCtrl.derive(function (model, factory) {
            GraphCtrl.call(this, model, factory);
            this.installFeature(new MindSelection());
            this.installFeature(new DragMove());
        }, {

            /**
             * @Override
             * */
            createFigure : function () {
                var svg = this.getSVG(),
                    paper = svg.paper,
                    model = this.getModel(),
                    text = model.get('text');
                
                this.rect= Style.getRect('normal', this);
                this.rect.create();
                

                if (this.isSecond()) {
                    this.line = Style.getLine('polyline', this);
                    this.line.create();
                } else {
                    this.line = Style.getLine('normal', this);
                    this.line.create();
                }

                this.renderProperties();

                this.rect.getNode().addEventListener('click',
                    this.onMouseEvent.bind(this, 'click'));
                this.rect.getNode().addEventListener('contextmenu',
                    this.onMouseEvent.bind(this, 'contextmenu'));

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
            },

            isRoot : function () {
                var model = this.getModel(),
                    diagramCtrl = this.getDiagram();
                if (!diagramCtrl) {
                    return false;
                }
                return model === diagramCtrl.getModel().getRoot();
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
                if (this.x === x && this.y === y) {
                    return;
                }
                
                this.rect.setXY(x, y);

                this.x = x;
                this.y = y;

                if (this.isRoot()) {
                    return;
                }

                this.line.setXY(x, y);
            },

            onSelect : function () {
                var paper = this.getSVG().paper,
                    box = this.rect.getBBox();
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
            },

            onMouseEvent : function (name, e) {
                this.bubble(name);
            }

        });

    }(det.GraphCtrl, det.BaseCtrl)
);