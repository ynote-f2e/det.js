detMindMap.AppendCommand = (function (det) {

    'use strict';

    return det.derive(function (model, childModel) {
        this.model = model;
        this.childModel = childModel;
    }, {

        execute : function () {
            this.index = this.model.getNodes()
                .indexOf(this.childModel) + 1;
            this.model.add(this.childModel, this.index);
        },

        undo : function () {
            this.model.remove(this.childModel);
        },

        redo : function () {
            this.model.add(this.childModel, this.index);
        }

    });

}(det));