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
        setRoot : function (root) {
            this.root = root;
            this.triggerChildren();
        },
        set : function (name, value) {
            var originValue = this.data[name];
            if (originValue === value) {
                return;
            }
            this.data[name] = value;
            this.trigger();
        },

        get : function (name) {
            return this.data[name];
        }

    }, {
        BG_CHANGE : 'bg-change'
    });

}(det.Model));

detMindMap.MindDiagram = MindDiagram;