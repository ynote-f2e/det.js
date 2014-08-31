var FirstLevelLineStyle = (function (Style) {

    var DEFAULTLINEATTR = {
            stroke : "#666",
            strokeWidth : '1'
        },
        HANDLEWIDTH = 8;

    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var svg = this.ctrl.getSVG(),
                paper = svg.paper;

            this.line = paper.polyline(0, 0, 0, 0);
        },

        getLine : function () {
            return this.line;
        },

        getFigure : function () {
            return this.line;
        },

        refresh : function () {
            var ctrl = this.ctrl,
                model = ctrl.getModel(),
                lineAttr;

            lineAttr = this.extend(DEFAULTLINEATTR, model.data.lineAttr);
            this.line.attr(lineAttr);
        },

        setXY : function (x, y) {
            var ctrl = this.ctrl,
                parentBox,
                box;

            parentBox = ctrl.getParent().rect.getBBox();
            box = ctrl.rect.getBBox();

            if (parentBox.x < box.x) {
                this.line.attr({
                    points : (x) + ',' + (y + box.height / 2 - 1.5) + ',' +
                            (x) + ',' + (y + box.height / 2 + 1.5) + ',' +
                            (x - HANDLEWIDTH) + ',' + (y + box.height / 2 + 1.5) + ',' +
                            (parentBox.x + parentBox.width / 2) + ',' + (parentBox.y + parentBox.height / 2 + 7) + ',' +
                            (parentBox.x + parentBox.width / 2) + ',' + (parentBox.y + parentBox.height / 2 - 7) + ',' +
                            (x - HANDLEWIDTH) + ',' + (y + box.height / 2 - 1.5)
                });
            } else {
                this.line.attr({
                    points : (x + box.width) + ',' + (y + box.height / 2 - 1.5) + ',' +
                            (x + box.width) + ',' + (y + box.height / 2 + 1.5) + ',' +
                            (x + box.width + HANDLEWIDTH) + ',' + (y + box.height / 2 + 1.5) + ',' +
                            (parentBox.x + parentBox.width / 2) + ',' + (parentBox.y + parentBox.height / 2 + 7) + ',' +
                            (parentBox.x + parentBox.width / 2) + ',' + (parentBox.y + parentBox.height / 2 - 7) + ',' +
                            (x + box.width + HANDLEWIDTH) + ',' + (y + box.height / 2 - 1.5)
                });
            }

            this.line.insertBefore(ctrl.getParent().rect.getFigure());
        }

    });

}(Style));

Style.registerLine('firstLevel', FirstLevelLineStyle);