detMindMap.MoveCommand = (function (det) {

    'use strict';

    return det.derive(function (model, parent, newParent) {
        this.model = model;
        this.parent = parent;
        this.newParent = newParent;
    }, {

        execute : function () {
            this.index = this.parent.getNodes()
                .indexOf(this.model);
            this.parent.remove(this.model);
            this.newParent.add(this.model);
        },

        undo : function () {
            this.model.add(this.model, this.index);
            this.parent.remove(this.model);
        },

        redo : function () {
            this.execute();
        }

    });

}(det));