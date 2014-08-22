det.DiagramCtrl = (function (GraphCtrl) {
    'use strict';

    return GraphCtrl.derive(function (model, factory) {
        this.factory = factory;
        GraphCtrl.call(this, model);
    }, {

        /* 根据模型构造 ctrl 节点 */

        render : function (svg) {
            this.svg = svg;
            this.attach();
        },

        getSVG : function () {
            return this.svg;
        },

        getDiagram : function () {
            return this;
        },

        getFactory : function (model) {
            return this.factory;
        }

    });

}(det.GraphCtrl));