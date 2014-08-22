/**
 * 思维导图的根节点对应的模型
 */
var MindDiagram = (function (Model) {
    'use strict';

    return Model.derive(function (data) {
        Model.call(this);
        this.data = data;
        this.root = new detMindMap.MindNode(data.root);
    }, {
        getRoot : function () {
            return this.root;
        },
        getBackground : function () {
            return this.data.bg;
        },
        setBackground : function (bg) {
            this.data.bg = bg;
            this.trigger();
        }
    }, {
        BG_CHANGE : 'bg-change'
    });

}(det.Model));

detMindMap.MindDiagram = MindDiagram;