det.DiagramCtrl = (function (GraphCtrl, CommandStack) {
    'use strict';

    return GraphCtrl.derive(function (model, factory) {
        GraphCtrl.call(this, model, factory);
        this.stack = new CommandStack();
    }, {

        /* 根据模型构造 ctrl 节点 */

        render : function (svg) {
            this.svg = svg;
            this.attach();
        },

        getSVG : function () {
            return this.svg;
        },

        getCommandStack : function () {
            return this.stack;
        },

        getDiagram : function () {
            return this;
        }

    });

}(det.GraphCtrl, CommandStack));