det.DiagramCtrl = (function (GraphCtrl, CommandStack) {
    'use strict';

    return GraphCtrl.derive(function (model, toolkit) {
        GraphCtrl.call(this, model, toolkit);
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
        },

        getSelection : function () {
            function collect(children, selection) {
                if (!children) {
                    return selection;
                }
                children.forEach(function (child) {
                    if (child.isSelected()) {
                        selection.push(child);
                    }
                    collect(child.getChildren(), selection);
                });
                return selection;
            }
            return collect([this], []);
        },

        undo : function () {
            this.getCommandStack().undo();
        },

        redo : function () {
            this.getCommandStack().redo();
        }

    });

}(det.GraphCtrl, CommandStack));