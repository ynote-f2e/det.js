var Style = (function (det) {

    return det.derive(function (ctrl) {
        this.ctrl = ctrl;
    }, {

        getCtrl : function () {
            return this.ctrl;
        },

        create : det.noop,
        refresh : det.noop

    });

}(det));

Style.rectStyle = {};
Style.lineStyle = {};
Style.getRect = function (model, style) {
    return new Style.rectStyle[style](model);
};
Style.registerRect = function (style, styleClass) {
    Style.rectStyle[style] = styleClass;
}