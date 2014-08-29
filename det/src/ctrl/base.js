/**
 * @class
 *
 */
det.BaseCtrl = (function (EventSupport, Model) {
    'use strict';

    function Event(name, target, data) {
        var prop,
            stopped;
        this.name = name;
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                this[prop] = data[prop];
            }
        }
        function stopPropagation() {
            stopped = true;
        }
        function isPropagationStopped() {
            return false;
        }
        this.target = target;
        this.stopPropagation = stopPropagation;
        this.isPropagationStopped = isPropagationStopped;
    }

    return EventSupport.derive(function (model, factory) {
        EventSupport.call(this);
        this.model = model;
        this.factory = factory;
        this.attached = false;
        this.parentCtrl = null;
        this.children = [];
        this.features = [];
        this.refreshChildren();
    }, {

        /**
         * @accept protected
         * @param childCtrl
         * @param index
         */
        addChild : function (childCtrl, index) {
            this.children.splice(index || this.children.length, 0, childCtrl);
            childCtrl.setParent(this);
            if (this.attached) {
                childCtrl.attach();
            }
            this.bubble('append', {
                child : childCtrl
            });
        },

        attach : function () {
            this.attached = true;
            this.onAttach();
            this.features.forEach(function (feature) {
                feature.active(this);
            }.bind(this));
            this.children.forEach(function (childCtrl) {
                childCtrl.attach();
            });
        },

        /* 根据模型构造 ctrl 节点 */
        createChild : function (model) {
            return this.factory(model);
        },

        bubble : function (name, data) {
            var event = new Event(name, this, data || {});
            this.handleBubble(name, event);
        },

        handleBubble : function (name, event) {
            var parent = this.getParent();
            event.currentTarget = this;
            this.trigger(name, event);
            if (event.isPropagationStopped()) {
                return;
            }
            if (!parent) {
                return;
            }
            parent.handleBubble(name, event);
        },

        detach : function () {
            this.children.forEach(function (childCtrl) {
                childCtrl.detach();
            });
            this.features.forEach(function (feature) {
                feature.deactive(this);
            }.bind(this));
            this.attached = false;
            this.onDetach();
        },

        execute : function (command) {
            return this.getCommandStack().execute(command);
        },

        /* 返回自身的 children 列表 */
        getChildren : function () {
            return this.children;
        },

        getFactory : function (model) {
            return this.factory;
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
            if (this.attached) {
                feature.onAttach();
            }
        },

        /* 判断一个 ctrl 是否在视图中 */
        isAttached : function () {
            return this.attached;
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
                this.addChild(this.createChild(model),
                    modelChildren.indexOf(model));
            }.bind(this));
        },

        removeChild : function (childCtrl) {
            var pos = this.children.indexOf(childCtrl);
            if (pos === -1) {
                return;
            }
            if (this.attached) {
                childCtrl.detach();
            }
            childCtrl.setParent(null);
            this.children.splice(pos, 1);
            this.bubble('remove', {
                child : childCtrl
            });
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

    });

}(det.EventSupport, det.Model));