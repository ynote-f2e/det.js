var NormalRectStyle = (function (Style) {

    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var svg = this.ctrl.getSVG(),
                paper = svg.paper,
                model = this.ctrl.getModel(),
                text = model.get('text');

            var rect = paper.rect(0, 0, 0, 0),
                text = paper.text(0, 0, text);

            //return svg.group(rect, text);
            return rect;
        },

        getFigure : function () {
            //return this.rect;
        },

        refresh : function () {
            var ctrl = this.getCtrl();
        }

    });

}(Style));

Style.registerRect('normal', NormalRectStyle);