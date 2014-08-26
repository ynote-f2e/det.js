detMindMap.MoveCommand = (function (det) {

    'use strict';

    return det.derive(function (model, x, y) {
        this.model = model;
        this.x = x;
        this.y = y;
        this.ox = this.model.get('x');
        this.oy = this.model.get('y');
    }, {

        execute : function () {
            this.model.set('x', this.x);
            this.model.set('y', this.y);
        },

        redo : function () {
            this.execute();
        },

        undo : function () {
            this.model.set('x', this.ox);
            this.model.set('y', this.oy);
        }

    });


}(det));