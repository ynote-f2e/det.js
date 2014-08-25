/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (
    function (GraphCtrl, DragDropFeature,
          MoveCommand) {
        'use strict';

        return GraphCtrl.derive({

            /**
             * @Override
             */
            createFeatures : function () {
                this.installFeature(new DragDropFeature({

                    moveFigure : function (offsetX, offsetY) {
                        var figure = this.getFigure();
                        figure.transform('translate(' +
                            offsetX + ',' + offsetY + ')');
                    }.bind(this),

                    postMove : function (offsetX, offsetY) {
                        var figure = this.getFigure(),
                            model = this.getModel();
                        figure.transform('');
                        return new MoveCommand(model,
                            model.get('x') + offsetX,
                            model.get('y') + offsetY);
                    }.bind(this)

                }));
            },

        /**
         * @Override
         * */
        createFigure : function () {
            var svg = this.getSVG(),
                paper = svg.paper,
                model = this.getModel(),
                parentCtrl = this.getParent(),
                parentModel = parentCtrl.getModel(),
                parentFigure = parentCtrl.getFigure(),
                x = model.get('x'),
                y = model.get('y'),
                width = model.get('width'),
                height = model.get('height'),
                text = model.get('text'),
                strokeWidth = 3;

            this.rect = paper.rect(x, y, width, height);
            if (_.isFunction(parentModel.get)) {
                this.line = paper.line(x, 
                            y,
                            parentModel.get('x'),
                            parentModel.get('y') + parentModel.get('height') / 2);
                this.line.attr({
                    stroke: '#00ADEF'
                })
                this.setLinePosition(x, y, width, height,
                                parentModel.get('x'),
                                parentModel.get('y'),
                                parentModel.get('width'),
                                parentModel.get('height'));
            }

            this.text = paper.text(x, y + height - strokeWidth - 2, text);

            //model.set('width', this.text.node.clientWidth);
            this.rect.attr({
                'fill-opacity': 0,
                width: (this.text.node.clientWidth),
                stroke: "#bada55",
                strokeWidth: strokeWidth
            })

            return paper.group(this.rect, this.text);
        },

        /**
         * @Override
         * */
        refreshFigure : function () {
            var figure = this.getFigure(),
                model = this.getModel(),
                parentCtrl = this.getParent(),
                parentModel = parentCtrl.getModel(),
                x = model.get('x'),
                y = model.get('y'),
                width = model.get('width'),
                height = model.get('height'),
                text = model.get('text'),
                strokeWidth = 3;
            this.text.attr({
                x: x,
                y: y  + height - strokeWidth - 2
            });
            this.rect.attr({
                'fill-opacity': 0,
                x: x,
                y: y
            });
            if (_.isFunction(parentModel.get)) {
                this.setLinePosition(x, y, width, height,
                                parentModel.get('x'),
                                parentModel.get('y'),
                                parentModel.get('width'),
                                parentModel.get('height'));
            }
        },

        /**
         * @Override
         * */
        getModelChildren : function () {
            var model = this.getModel();
            return model.nodes;
        },

        setLinePosition: function(x, y, w, h, px, py, pw, ph) {
            var center = {
                    x: x + w / 2,
                    y: y + h / 2
                },
                pcenter = {
                    x: px + pw / 2,
                    y: py + ph / 2
                };

            if (center.x >= pcenter.x && center.y >= pcenter.y) {
                if (center.x - pcenter.x >= center.y - pcenter.y) {
                    this.line.attr({
                        x1: px + pw,
                        y1: py + ph / 2,
                        x2: x,
                        y2: y + h / 2
                    });
                } else {
                    this.line.attr({
                        x1: px + pw / 2,
                        y1: py + ph,
                        x2: x,
                        y2: y + h / 2
                    });
                }
            } else if (center.x >= pcenter.x && center.y < pcenter.y) {
                if (center.x - pcenter.x >= pcenter.y - center.y) {
                    this.line.attr({
                        x1: px + pw,
                        y1: py + ph / 2,
                        x2: x,
                        y2: y + h / 2
                    });
                } else {
                    this.line.attr({
                        x1: px + pw / 2,
                        y1: py,
                        x2: x,
                        y2: y + h / 2
                    });
                }
            } else if (center.x < pcenter.x && center.y >= pcenter.y) {
                if (pcenter.x - center.x >= center.y - pcenter.y) {
                    this.line.attr({
                        x1: px,
                        y1: py + ph / 2,
                        x2: x + w,
                        y2: y + h / 2
                    });
                } else {
                    this.line.attr({
                        x1: px + pw / 2,
                        y1: py + ph,
                        x2: x + w,
                        y2: y + h / 2
                    });
                }
            } else {
                if (pcenter.x - center.x >= pcenter.y - center.y) {
                    this.line.attr({
                        x1: px,
                        y1: py + ph / 2,
                        x2: x + w,
                        y2: y + h / 2
                    });
                } else {
                    this.line.attr({
                        x1: px + pw / 2,
                        y1: py,
                        x2: x + w,
                        y2: y + h / 2
                    });
                }
            }
        }
    });

}(det.GraphCtrl, det.DragDropFeature, MoveCommand));