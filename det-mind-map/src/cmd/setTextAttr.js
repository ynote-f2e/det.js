detMindMap.SetTextAttrCommand = (function (det) {

    'use strict';

    return det.derive(function (model, name, value) {
        this.model = model;
        this.name = name;
        this.value = value;
    }, {

        execute : function () {
            this.original = this.model.getTextAttr(this.name) || '#000';
            this.model.setTextAttr(this.name, this.value);
        },

        undo : function () {
            this.model.setTextAttr(this.name, this.original);
        },

        redo : function () {
            this.model.setTextAttr(this.name, this.value);
        }

    });

}(det));