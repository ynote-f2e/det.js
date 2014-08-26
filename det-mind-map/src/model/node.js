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
        },

        add : function (node) {
            this.nodes.push(node);
            this.triggerChildren();
        },

        remove : function (node) {
            var index = this.nodes.indexOf(node);
            if (index === -1) {
                return;
            }
            this.nodes.splice(index, 1);
            this.triggerChildren();
        }

    });

}(det.Model));

detMindMap.MindNode = MindNode;