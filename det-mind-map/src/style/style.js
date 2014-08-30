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

        extend : function(src, obj) {
            var copy = src.constructor();
            for (var attr in src) {
                if (src.hasOwnProperty(attr)) {
                    copy[attr] = src[attr];
                }
            }
            for(var attr in obj) {
                copy[attr] = obj[attr];
            }
            return copy;
        },
        
        getFigure : det.noop,

        create : det.noop,
        refresh : det.noop,

        destroy : det.noop

    });

}(det));

Style.rectStyle = {};
Style.lineStyle = {};
Style.getRect = function (style, ctrl) {
    if (!Style.rectStyle[style]) {
        return;
    }
    return new Style.rectStyle[style](style, ctrl);
};
Style.getLine = function (style, ctrl) {
    if (!Style.lineStyle[style]) {
        return;
    }
    return new Style.lineStyle[style](style, ctrl);
}
Style.registerRect = function (style, styleClass) {
    Style.rectStyle[style] = styleClass;
}
Style.registerLine = function (style, styleClass) {
    Style.lineStyle[style] = styleClass;
}