var OtherLeveLLineStyle = (function (Style) {

    var DEFAULTLINEATTR = {
            fill : 'none'
        };


    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var svg = this.ctrl.getSVG(),
                paper = svg.paper;

            this.line = paper.line(0, 0, 0, 0);
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
                strokeWidth,
                lineAttr;

            strokeWidth = ctrl.getDepth() > 3 ? 1 : 2;

            lineAttr = this.extend(this.extend(DEFAULTLINEATTR, 
                                        {strokeWidth: strokeWidth}),
                                    model.get('lineAttr'));
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

            if (parentBox.x < box.x) {
                this.line.attr({
                    x1 : x,
                    y1 : y + box.height,
                    x2 : parentBox.x + parentBox.width,
                    y2 : parentBox.y + parentBox.height
                });
            } else {
                this.line.attr({
                    x1 : x + box.width,
                    y1 : y + box.height,
                    x2 : parentBox.x,
                    y2 : parentBox.y + parentBox.height
                });
            }
        }

    });

}(Style));

Style.registerLine('otherLevel', OtherLeveLLineStyle);