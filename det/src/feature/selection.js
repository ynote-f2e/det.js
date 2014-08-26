det.SelectionFeature = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        onActive : function () {
            var figure = this.getCtrl().getFigure();
            figure.mouseover(this.onMouseOver.bind(this));
            figure.mouseout(this.onMouseOut.bind(this));
        },

        onDeactive : function () {
            var figure = this.getCtrl().getFigure();
        },

        onMouseOver : function (e) {
            this.hovered = true;
            console.log('mouseover', e);
        },

        onMouseOut : function (e) {
            console.log('mouseout', e);
        }

    });

}(det.BaseFeature));