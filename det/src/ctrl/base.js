/**
 * @class
 *
 */
det.BaseCtrl = (function (EventSupport, Model) {
    'use strict';

    return EventSupport.derive(function (model) {
        EventSupport.call(this);
        this.model = model;
        this.selected = false;
        this.attached = false;
        this.parentCtrl = null;
        this.children = [];
        this.features = [];
    }, {

        /**
         * @accept protected
         * @param childCtrl
         * @param index
         */
        addChild : function (childCtrl, index) {
            this.children.splice(index, 0, childCtrl);
            childCtrl.setParent(this);
            this.trigger(det.BaseCtrl.CHILD_ADD, childCtrl);
        },

        attach : function () {
            this.onAttach();
            this.refreshChildren();
            this.children.forEach(function (childCtrl) {
                childCtrl.attach();
            });
            this.features.forEach(function (feature) {
                feature.active(this);
            }.bind(this));
            this.attached = true;
        },

        /* 根据模型构造 ctrl 节点 */
        createChild : function (model) {
            var diagram = this.getDiagram();
            if (!diagram) {
                return null;
            }
            return diagram.getFactory()(model);
        },

        detach : function () {
            this.attached = false;
            this.onDetach();
            this.children.forEach(function (childCtrl) {
                childCtrl.detach();
            });
            this.features.forEach(function (feature) {
                feature.deactive(this);
            }.bind(this));
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
            return this.parentCtrl;
        },

        installFeature : function (feature) {
            if (this.features.indexOf(feature) !== -1) {
                return;
            }
            this.features.push(feature);
        },

        /* 判断一个 ctrl 是否在视图中 */
        isAttached : function () {
            return this.attached;
        },

        /* 执行一个外部的请求，在请求内执行更新 model 的逻辑 */
        perform : function (action, args) {
            var command = this.createCommand(action, args);
            if (!command) {
                return;
            }
            this.execute(command);
        },

        refresh : function () {
            this.refreshFigure();
        },

        refreshChildren : function () {
            var modelChildren = this.getModelChildren(),
                children = this.getChildren(),
                newModels = [],
                removedCtrls = [];
            children.forEach(function (childCtrl) {
                var model = childCtrl.getModel();
                if (modelChildren.indexOf(model) == -1) {
                    removedCtrls.push(childCtrl);
                }
            });
            modelChildren.forEach(function (model) {
                if (children.every(function (childCtrl) {
                        return childCtrl.getModel() != model;
                    })) {
                    newModels.push(model);
                }
            });
            removedCtrls.forEach(function (childCtrl) {
                this.removeChild(childCtrl);
            }.bind(this));
            newModels.forEach(function (model) {
                this.addChild(this.createChild(model));
            }.bind(this));
        },

        removeChild : function (childCtrl) {
            var pos = this.children.indexOf(childCtrl);
            if (pos === -1) {
                return;
            }
            childCtrl.setParent(null);
            this.children.splice(pos, 1);
            this.trigger(det.BaseCtrl.CHILD_REMOVE, childCtrl);
        },

        setParent : function (parentCtrl) {
            this.parentCtrl = parentCtrl;
        },

        uninstallFeature : function (feature) {
            var index = this.features.indexOf(feature);
            if (index === -1) {
                return;
            }
            this.features.splice(index, 1);
        },

        /**
         * 将一个请求转换为一个 command ，包括 exec undo redo 方法
         */
        createCommand : det.noop,

        /**
         * 返回根节点的 ctrl
         */
        getDiagram : det.noop,

        /**
         * 返回根节点对应的图形
         */
        getFigure : det.noop,

        /**
         * 获得绘图接口，对应一个 Snap 实例
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
        refreshFigure : det.noop

    }, {
        CHILD_ADD : 'child-add',
        CHILD_REMOVE : 'child-remove'
    });

}(det.EventSupport, det.Model));