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
                    parentFigure = parentCtrl.getFigure();
                this.rect = paper.rect(model.get('x'),
                    model.get('y'),
                    model.get('width'),
                    model.get('height'));
                this.text = paper.text(model.get('x'), model.get('y'), model.get('text'));
                return paper.group(this.rect, this.text);
            },

            /**
             * @Override
             * */
            refreshFigure : function () {
                var figure = this.getFigure(),
                    model = this.getModel();
                this.rect.attr('x', model.get('x'))
                    .attr('y', model.get('y'))
                    .attr('width', model.get('width'))
                    .attr('height', model.get('height'));
                this.text.attr('x', model.get('x'))
                    .attr('y', model.get('y'));
            },

            /**
             * @Override
             * */
            getModelChildren : function () {
                var model = this.getModel();
                return model.nodes;
            }

        });

}(det.GraphCtrl, det.DragDropFeature, MoveCommand));