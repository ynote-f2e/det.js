var Style = (function (det) {

    return det.derive(function (style, ctrl) {
        this.ctrl = ctrl;
        this.style = style;
    }, {

        getName : function () {
            return this.style;
        },

        getCtrl : function () {
            return this.ctrl;
        },

        getFigure : det.noop,

        create : det.noop,
        refresh : det.noop,

        destroy : det.noop

    });

}(det));

Style.rectStyle = {};
Style.lineStyle = {};
Style.getRect = function (model, style) {
    return new Style.rectStyle[style](style, model);
};
Style.registerRect = function (style, styleClass) {
    Style.rectStyle[style] = styleClass;
}