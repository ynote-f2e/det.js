detMindMap.RemoveCommand = (function (det) {

    'use strict';

    return det.derive(function (model, childModel) {
        this.model = model;
        this.childModel = childModel;
    }, {

        execute : function () {
            this.index = this.model.getNodes()
                .indexOf(this.childModel);
            this.model.remove(this.childModel);
        },

        undo : function () {
            this.model.add(this.childModel, this.index);
        },

        redo : function () {
            this.model.remove(this.childModel);
        }

    });

}(det));