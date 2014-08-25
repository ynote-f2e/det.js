/**
 * 思维导图的主题节点对应的控制器
 */
var MindNodeCtrl = (function (GraphCtrl) {
    'use strict';

    return GraphCtrl.derive({

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
        },

        isDraggable : function () {
            return true;
        },

        moveBy : function (offsetX, offsetY) {
            var model = this.getModel();
            model.set('x', model.get('x') + offsetX);
            model.set('y', model.get('y') + offsetY);
        }

    });

}(det.GraphCtrl));

detMindMap.MindNodeCtrl = MindNodeCtrl;