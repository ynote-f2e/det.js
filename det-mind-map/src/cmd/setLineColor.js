detMindMap.SetLineColorCommand = (function (det) {

    'use strict';

    return det.derive(function (model, color) {
        this.model = model;
        this.color = color;
        this.oldColor = model.get('lineAttr').stroke;
    }, {

        setLineColor : function (model, color) {
            var lineAttr = {}.extend(model.get('lineAttr'));
            lineAttr.stroke = color;
            lineAttr.fill = color;
            var rectAttr = {}.extend(model.get('rectAttr'));
            rectAttr.stroke = color;
            model.set('lineAttr', lineAttr);
            model.set('rectAttr', rectAttr);
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