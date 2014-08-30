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
        this.data.lineAttr = this.data.lineAttr || {};
        this.data.rectAttr = this.data.rectAttr || {};
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

        getTextAttr : function (name) {
            if (this.data.textAttr) {
                return this.data.textAttr[name];
            }
            return null;
        },

        setTextAttr : function (name, value) {
            if (!this.data.textAttr) {
                this.data.textAttr = {};
            }
            if (this.data.textAttr[name] === value) {
                return;
            }
            this.data.textAttr[name] = value;
            this.trigger();
        },

        getLineAttr : function (name) {
            if (this.data.lineAttr) {
                return this.data.lineAttr[name];
            }
            return null;
        },

        setLineAttr : function (name, value) {
            if (this.data.lineAttr[name] === value) {
                return;
            }
            this.data.lineAttr[name] = value;
            this.trigger();
        },

        getRectAttr : function (name) {
            if (this.data.rectAttr) {
                return this.data.rectAttr[name];
            }
            return null;
        },

        setRectAttr : function (name, value) {
            if (this.data.rectAttr[name] === value) {
                return;
            }
            this.data.rectAttr[name] = value;
            this.trigger();
        },

        add : function (node, index) {
            this.nodes.splice(index, 0, node);
            this.triggerChildren();
        },

        remove : function (node) {
            var index = this.nodes.indexOf(node);
            if (index === -1) {
                return;
            }
            this.nodes.splice(index, 1);
            this.triggerChildren();
        },

        getNodes : function () {
            return this.nodes;
        }

    });

}(det.Model));

detMindMap.MindNode = MindNode;