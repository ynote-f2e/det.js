var UnderLineStyle = (function (Style) {

    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var ctrl = this.getCtrl();

            //return rect;
        },
        
        getRect : function () {
            return this.rect;
        },

        getText : function () {
            return this.text;
        },

        getFigure : function () {
            var svg = this.ctrl.getSVG()
            return svg.group(this.rect, this.text);
        },

        refresh : function () {
            var ctrl = this.getCtrl();
        }

    });

}(Style));

Style.registerRect('underline', UnderLineStyle);