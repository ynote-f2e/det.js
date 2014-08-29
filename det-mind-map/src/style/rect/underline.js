var UnderLineStyle = (function (Style) {

    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var ctrl = this.getCtrl();

            //this.figure = svg.group();
        },
        
        getRect : function () {
            return this.rect;
        },

        getText : function () {
            return this.text;
        },

        getFigure : function () {
            return this.figure;
        },

        refresh : function () {
            var ctrl = this.getCtrl();
        }

    });

}(Style));

Style.registerRect('underline', UnderLineStyle);