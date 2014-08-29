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

        execute : function () {
            this.setLineColor(this.model, this.color);
        },

        undo : function () {
            this.setLineColor(this.model, this.oldColor);
        },

        redo : function () {
            this.setLineColor(this.model, this.color);
        }

    });

}(det));