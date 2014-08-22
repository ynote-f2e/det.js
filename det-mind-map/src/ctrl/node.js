var MindNodeCtrl = (function (GraphCtrl) {
    'use strict';

    return GraphCtrl.derive({

        createFigure : function () {
            var svg = this.getSVG(),
                paper = svg.paper,
                model = this.getModel();
            return paper.group(paper.rect(model.get('x'),
                model.get('y'),
                model.get('width'),
                model.get('height')), paper.text(),
                paper.text(model.get('x'), model.get('y'), model.get('text')));
        },

        refreshFigure : function () {
            var figure = this.getFigure(),
                model = this.getModel();
            /*figure.attr('x', model.get('x'))
                .attr('y', model.get('y'))
                .attr('width', model.get('width'))
                .attr('height', model.get('height'));
            */
        },

        getModelChildren : function () {
            var model = this.getModel();
            return model.nodes;
        }

    });

}(det.GraphCtrl));

detMindMap.MindNodeCtrl = MindNodeCtrl;