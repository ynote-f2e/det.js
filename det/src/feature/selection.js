det.SelectionFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        onActive : function () {
            var figure = this.getCtrl().getFigure();
        },

        onDeactive : function () {
            var figure = this.getCtrl().getFigure();
        }

    });

}(det.BaseFeature));