var PolylineLineStyle = (function (Style) {
    function extend(src, obj) {
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
        };
    var DEFAULTLINEATTR = {
            stroke : "#666",
            strokeWidth : '1'
        },
        HANDLEWIDTH = 4;

    return Style.derive(function (style, ctrl) {
        Style.call(this, style, ctrl);
    }, {

        create : function () {
            var svg = this.ctrl.getSVG(),
                paper = svg.paper;

            this.line = paper.polyline(0, 0, 0, 0);

            this.line.insertBefore(this.ctrl.getParent().rect.getRect());
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

            lineAttr = extend(DEFAULTLINEATTR, model.data.lineAttr);
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
                    points : parseInt(x) + ',' + parseInt(y + box.height / 2 - 1) + ',' +
                            parseInt(x) + ',' + parseInt(y + box.height / 2 + 1) + ',' +
                            parseInt(parentBox.x + parentBox.width / 2) + ',' + parseInt(parentBox.y + parentBox.height / 2 + 5) + ',' +
                            parseInt(parentBox.x + parentBox.width / 2) + ',' + parseInt(parentBox.y + parentBox.height / 2 - 5)
                });
            } else {
                this.line.attr({
                    points : parseInt(x + box.width) + ',' + parseInt(y + box.height / 2 - 1) + ',' +
                            parseInt(x + box.width) + ',' + parseInt(y + box.height / 2 + 1) + ',' +
                            parseInt(parentBox.x + parentBox.width / 2) + ',' + parseInt(parentBox.y + parentBox.height / 2 + 5) + ',' +
                            parseInt(parentBox.x + parentBox.width / 2) + ',' + parseInt(parentBox.y + parentBox.height / 2 - 5)
                });
            }

            this.line.insertBefore(ctrl.getParent().rect.getFigure());
        }

    });

}(Style));

Style.registerLine('polyline', PolylineLineStyle);