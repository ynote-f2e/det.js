function Context(parentContext, model, registry) {
    'use strict';

    var xtype = model.xtype,
        children = [];

    if (!xtype) {
        throw 'Cannot find xtype in input model';
    }

    if (!registry[xtype]) {
        throw 'Cannot find controller for model type \"' + xtype + '\"';
    }

    this.getType = getType;
    this.getModel = getModel;
    this.getParent = getParent;
    this.setModelChildren = setModelChildren;
    this.destroy = destory;

    function getType() {
        return xtype;
    }

    function getModel() {
        return model;
    }

    function getChildren() {
        return children;
    }

    function getParent() {
        return parentContext;
    }

    function setModelChildren() {

    }

    function destory() {

    }
}