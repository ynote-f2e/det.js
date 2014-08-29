var UnderLineStyle = (function (Style) {

    return Style.derive(function (style, ctrl) {
        Style.call(this, ctrl);
        Style.call(this, style);
    }, {

        create : function () {
            var ctrl = this.getCtrl();

            //return rect;
        },

        getFigure : function () {
            //return this.rect;
        },

        refresh : function () {
            var ctrl = this.getCtrl();
        }

    });

}(Style));

Style.registerRect('underline', UnderLineStyle);