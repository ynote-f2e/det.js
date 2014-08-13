'use strict';

var mindMap = {
    name : 'det-mind',
    init : initPlugin
}

function initPlugin(toolkit) {
    toolkit.factory('det-min-map/diagram', DiagramCtrl)
        .factory('det-mind-map/node', NodeCtrl)
        .factory('det-mind-map/connection', ConnectionCtrl);
}

/*global define*/
if (typeof define === 'function' && define.amd) {
    define('det-mind', [], function() {
        return mindMap;
    });
} else {
    window.detMindMap = mindMap;
}