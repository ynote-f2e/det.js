det.DiagramCtrl = (function (GraphCtrl) {
    'use strict';

    return GraphCtrl.derive(function () {
        GraphCtrl.call(this);
        this.svg = null;
    }, {

        render : function (svg) {
            this.svg = svg;
            this.attach();
        },

        getSVG : function () {
            return this.svg;
        },

        getDiagram : function () {
            return this;
        }

    });

}(det.GraphCtrl));