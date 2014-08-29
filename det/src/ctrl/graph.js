det.GraphCtrl = (function (BaseCtrl) {
    'use strict';

    return BaseCtrl.derive(function (model, factory) {
        BaseCtrl.call(this, model, factory);
        this.selected = false;
    }, {

        getDiagram : function () {
            var parentCtrl = this.getParent();
            if (!parentCtrl) {
                return null;
            }
            return parentCtrl.getDiagram();
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
            this.getModel().unbindChildren(this.refreshChildren, this);
            if (this.selected) {
                this.deselect();
            }
            this.figure.remove();
        },

        select : function () {
            if(this.selected) {
                return;
            }
            this.selected = true;
            this.onSelect();
            this.bubble('select');
        },

        deselect : function () {
            if(!this.selected) {
                return;
            }
            this.selected = false;
            this.onDeselect();
            this.bubble('deselect');
        },

        isSelected : function () {
            return this.selected;
        },

        onSelect : det.noop,

        onDeselect : det.noop,

        createFigure : det.noop,

        getSourceLink : det.noop,

        getTargetLink : det.noop

    });

}(det.BaseCtrl));