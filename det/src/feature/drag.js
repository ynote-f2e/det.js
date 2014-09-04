det.DragFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        getFigure : det.abstract,

        onAttach : function () {
            this.figure = this.getFigure();
            this.figure.drag(this.onDragMove.bind(this),
                this.onDragStart.bind(this), this.onDragEnd.bind(this));
        },

        onDetach : function () {
            if (!this.figure) {
                return;
            }
            this.figure.undrag();
        },

        onDragStart : det.noop,

        onDragMove : det.noop,

        onDragEnd : det.noop

    });

}(det.BaseFeature));