var MindNode = (function (Model) {
    'use strict';

    return Model.derive(function (data) {
        Model.call(this);
        this.data = data;
    }, {
        getBackground : function () {
            return this.data.bg;
        },
        setBackground : function (bg) {
            this.data.bg = bg;
            this.triggerChanged();
        }
    });

}(det.Model));

detMindMap.MindNode = MindNode;