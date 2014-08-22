det.BaseCtrl = (function (EventSupport, Model) {
    'use strict';

    return EventSupport.derive(function () {
        EventSupport.call(this);
        this.selected = false;
        this.attached = false;
        this.parent = null;
        this.model = null;
        this.children = [];
        this.refreshChildren();
    }, {

        /* 增加一个子 ctrl 节点 */
        addChild : function (childCtrl, index) {
            this.children.splice(index, 0, childCtrl);
            this.trigger(det.BaseCtrl.CHILD_ADD, childCtrl);
        },

        attach : function () {
            this.attached = true;
            this.onAttach();
            this.children.forEach(function (childCtrl) {
                childCtrl.attach();
            });
        },

        /* 根据模型构造 ctrl 节点 */
        createChild : function (model) {
            return parent.createChild(model);
        },

        detach : function () {
            this.attached = false;
            this.onDetach();
            this.children.forEach(function (childCtrl) {
                childCtrl.detach();
            });
        },

        execute : function (command) {
            return this.getRoot().execute(command);
        },

        /* 返回自身的 children 列表 */
        getChildren : function () {
            return this.children;
        },

        /* 返回当前 ctrl 对应的 model 对象 */
        getModel : function () {
            return this.model;
        },

        getParent : function () {
            return parent;
        },

        /* 判断一个 ctrl 是否在视图中 */
        isAttached : function () {
            return this.attached;
        },

        /* 执行一个外部的请求，在请求内执行更新 model 的逻辑 */
        perform : function (action, args) {
            var command = this.onPerform(action, args);
            if (!command) {
                return;
            }
            this.execute(command);
        },

        refresh : function () {
            this.onRefresh();
        },

        refreshChildren : function () {

        },

        removeChild : function (childCtrl) {
            var pos = this.children.indexOf(childCtrl);
            if (pos === -1) {
                return;
            }
            this.children.splice(pos, 1);
            this.trigger(det.BaseCtrl.CHILD_REMOVE, childCtrl);
        },

        setModel : function (model) {
            this.model = model;
        },

        setParent : function (parent) {
            this.parent = parent;
        },

        /**
         * 返回根节点的 ctrl
         */
        getDiagram : det.noop,

        /**
         * 返回根节点对应的图形
         */
        getFigure : det.noop,

        /**
         * 获得绘图接口
         */
        getSVG : det.noop,

        /**
         * 获得模型对应的子节点，det 框架通过子节点名来构造子 ctrl
         */
        getModelChildren : det.noop,

        /**
         * 当该 ctrl 被添加到视图中被调用，通常用于在模型上注册事件
         * 该方法需要返回一个 svg 的绘图对象
         */
        onAttach : det.noop,

        /**
         * 当该 ctrl 从视图中删除中会被调用，通常用于对模型上的事件解绑
         */
        onDetach : det.noop,

        /**
         * 当模型发生变化，需要对视图进行刷新时会被调用
         */
        onRefresh : det.noop,

        /**
         * 执行一个请求，修改模型
         */
        onPerform : det.noop
    }, {
        CHILD_ADD : 'child-add',
        CHILD_REMOVE : 'child-remove'
    });

}(det.EventSupport, det.Model));