det.DragDropFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        onActive : function () {
            var figure = this.getCtrl().getFigure();
            figure.drag(this.onMove.bind(this),
                this.onStart.bind(this), this.onEnd.bind(this));
        },

        onDeactive : function () {
            var figure = this.getCtrl().getFigure();
            figure.undrag();
        },

        onStart : function (x, y) {},

        onMove : function (dx, dy) {
            this.dx = dx;
            this.dy = dy;
            this.moveFigure(dx, dy);
        },

        onEnd : function () {
            this.postMove(this.dx, this.dy);
            delete this.dx;
            delete this.dy;
        },

        moveFigure : det.noop,

        postMove : det.noop

    });

}(det.BaseFeature));