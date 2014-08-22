var detMindMap;

(function (window) {
    'use strict';

    detMindMap = function (toolkit) {
        toolkit.factory(MindDiagram, MindDiagramCtrl);
        toolkit.factory(MindNode, MindNodeCtrl);
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

