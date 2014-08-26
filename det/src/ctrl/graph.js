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

        getCommandStack : function () {
            var diagram = this.getDiagram();
            if (!diagram) {
                return null;
            }
            return diagram.getCommandStack();
        },

        onAttach : function () {
            this.getModel().bind(this.refresh, this);
            this.getModel().bindChildren(this.refreshChildren, this);
            this.figure = this.getFigure();
        },

        onDetach : function () {
            this.getModel().unbind(this.refresh);
            this.getModel().bindChildren(this.refreshChildren, this);
            this.figure.remove();
        },

        createFigure : det.noop,

        getSourceLink : det.noop,

        getTargetLink : det.noop

    });

}(det.BaseCtrl));