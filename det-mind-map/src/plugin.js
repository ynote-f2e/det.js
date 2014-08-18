var DetMindMap;

(function (window) {
    'use strict';

    DetMindMap = function (toolkit) {
        toolkit.factory('det-mind/diagram', DiagramCtrl)
            .factory('det-mind/node', NodeCtrl)
            .factory('det-mind/link', LinkCtrl);
    };

    /*global define*/
    if (typeof define === 'function' && define.amd) {
        define('det-mind', [], function () {
            return DetMindMap;
        });
    } else {
        window.DetMindMap = DetMindMap;
    }

}(window));

