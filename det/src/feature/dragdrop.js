det.DragDropFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        dx : 0,

        dy : 0,

        onActive : function () {
            var figure = this.getCtrl().getFigure();
            figure.drag(this.onDragMove.bind(this),
                this.onDragStart.bind(this), this.onDragEnd.bind(this));
        },

        onDeactive : function () {
            var figure = this.getCtrl().getFigure();
            figure.undrag();
        },

        onDragStart : det.noop,

        onDragMove : det.noop,

        onDragEnd : det.noop

    });

}(det.BaseFeature));