var SecondLevelLineStyle = (function (Style) {

    var DEFAULTLINEATTR = {
            strokeWidth : '3',
            fill : 'none'
        },
        HANDLEWIDTH = 4;


    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var svg = this.ctrl.getSVG(),
                paper = svg.paper;

            //this.line = paper.line(0, 0, 0, 0);
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

            lineAttr = this.extend(model.get('lineAttr'), DEFAULTLINEATTR);
            this.line.attr(lineAttr);
        },

        setXY : function (x, y) {
            var ctrl = this.ctrl,
                parentBox,
                box,
                parentRectStyle,
                rectStyle;

            parentBox = ctrl.getParent().rect.getBBox();
            box = ctrl.rect.getBBox();

            parentRectStyle = ctrl.getParent().rect.getName();
            rectStyle = ctrl.rect.getName();

            if (parentBox.x < box.x) {
                this.line.attr({
                    points : (x) + ',' + (y + box.height) + ',' +
                        (parentBox.x + parentBox.width + HANDLEWIDTH) + ',' + (parentBox.y + parentBox.height / 2) + ',' +
                        (parentBox.x + parentBox.width) + ',' + (parentBox.y + parentBox.height / 2)
                });
            } else {
                this.line.attr({
                    points : (x + box.width) + ',' + (y + box.height) + ',' +
                        (parentBox.x - HANDLEWIDTH) + ',' + (parentBox.y + parentBox.height / 2) + ',' +
                        (parentBox.x) + ',' + (parentBox.y + parentBox.height / 2)
                });
            }
        }

    });

}(Style));

Style.registerLine('secondLevel', SecondLevelLineStyle);