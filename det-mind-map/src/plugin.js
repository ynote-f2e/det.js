var detMindMap;

(function (window) {
    'use strict';

    detMindMap = function (toolkit) {
        var ctrlFactory = toolkit.getCtrlFactory(),
            filterFactory = toolkit.getFilterFactory();
        ctrlFactory.register(MindDiagram, MindDiagramCtrl);
        ctrlFactory.register(MindNode, MindNodeCtrl);
    };

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define('det-mind', [], function () {
            return detMindMap;
        });
    } else {
        window.detMindMap = detMindMap;
    }

}(window));

