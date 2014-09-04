var detMindMap = function (toolkit) {
    var ctrlFactory = toolkit.getCtrlFactory(),
        filterFactory = toolkit.getFilterFactory();
    ctrlFactory.register(MindDiagram, MindDiagramCtrl);
    ctrlFactory.register(MindNode, MindNodeCtrl);
};

(function (factory) {
    'use strict';

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define(['det'], factory);
    } else {
        factory(window.det);
    }

}(function (det) {



}));