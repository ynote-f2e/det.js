/**
 * 思维导图的主题节点对应的模型
 */
var MindNode = (function (Model) {
    'use strict';

    return Model.derive(function (data) {
        Model.call(this);
        this.data = data;
        this.nodes = (data.nodes || []).map(function (node) {
            return new MindNode(node);
        });
    }, {
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

    });

}(det.Model));

detMindMap.MindNode = MindNode;