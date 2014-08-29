detMindMap.SetBackgroundColorCommand = (function (det) {

    'use strict';

    return det.derive(function (model, color) {
        this.model = model;
        this.color = color;
        this.oldColor = model.getRectAttr('fill');
    }, {

        execute : function () {
            this.model.setRectAttr('fill', this.color);
        },

        undo : function () {
            this.model.setRectAttr('fill', this.oldColor);
        },

        redo : function () {
            this.model.setRectAttr('fill', this.color);
        }

    });

}(det));