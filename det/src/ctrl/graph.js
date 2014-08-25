det.GraphCtrl = (function (BaseCtrl) {
    'use strict';

    return BaseCtrl.derive({

        getDiagram : function () {
            var parentCtrl = this.getParent();
            if (!this.parentCtrl) {
                return null;
            }
            return this.parentCtrl.getDiagram();
        },

        getFigure : function () {
            if (!this.figure) {
                this.figure = this.createFigure();
                if (this.isDraggable()) {
                    this.figure.drag(this.onDragMove.bind(this),
                        null,
                        this.onDragEnd.bind(this));
                }
            }
            return this.figure;
        },

        getSVG : function () {
            var diagram = this.getDiagram();
            if (!diagram) {
                return null;
            }
            return diagram.getSVG();
        },

        onAttach : function () {
            this.getModel().bind(this.refresh, this);
            this.figure = this.getFigure();
        },

        onDetach : function () {
            this.getModel().unbind(this.refresh);
            this.figure.remove();
        },

        onDragMove : function (dx, dy, x, y) {
            this.dragOffsetX = dx;
            this.dragOffsetY = dy;
            this.figure.transform('translate(' +
                dx + ',' + dy + ')');
        },

        onDragEnd : function () {
            this.figure.transform('');
            this.moveBy(this.dragOffsetX, this.dragOffsetY);
        },

        createFigure : det.noop,

        getSourceLink : det.noop,

        getTargetLink : det.noop,

        isDraggable : det.noop,

        moveBy : det.noop

    });

}(det.BaseCtrl));