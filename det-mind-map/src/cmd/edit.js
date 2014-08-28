detMindMap.EditCommand = (function (det) {

    'use strict';

    return det.derive(function (model, name, value) {
        this.model = model;
        this.name = name;
        this.value = value;
    }, {

        execute : function () {
            this.original = this.model.get(this.name);
            this.model.set(this.name, this.value);
        },

        undo : function () {
            this.model.set(this.name, this.original);
        },

        redo : function () {
            this.model.set(this.name, this.value);
        }

    });

}(det));