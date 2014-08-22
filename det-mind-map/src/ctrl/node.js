var MindNodeCtrl = (function (GraphCtrl) {
    'use strict';

    return GraphCtrl.derive({

        onAttach : function () {
            GraphCtrl.prototype.onAttach.call(this);
        },

        getModelChildren : function () {
            var model = this.getModel();
            return model.nodes;
        }

    });

}(det.GraphCtrl));

detMindMap.MindNodeCtrl = MindNodeCtrl;