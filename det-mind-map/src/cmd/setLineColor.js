detMindMap.SetLineColorCommand = (function (det) {

    'use strict';

    return det.derive(function (model, color) {
        this.model = model;
        this.color = color;
        this.oldColor = model.get('lineAttr').stroke;
    }, {

        setLineColor : function (model, color) {
            model.setLineAttr('stroke', color);
            model.setLineAttr('fill', color);
            model.setRectAttr('stroke', color);
        },

        paintChildren : function (model, color) {
            if (!model) {
                return;
            }
            var node, nodes = [].concat(model.nodes);
            this.setLineColor(model, color);
            while (nodes.length) {
                node = nodes.shift();
                this.paintChildren(node, color);
            }
        },

        execute : function () {
            this.paintChildren(this.model, this.color);
        },

        undo : function () {
            this.paintChildren(this.model, this.oldColor);
        },

        redo : function () {
            this.paintChildren(this.model, this.color);
        }

    });

}(det));