var NormalLineStyle = (function (Style) {
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
                    x1 : x,
                    y1 : y + box.height / 2,
                    x2 : parentBox.x + parentBox.width,
                    y2 : parentBox.y + parentBox.height / 2
                });
            } else {
                this.line.attr({
                    x1 : x + box.width,
                    y1 : y + box.height / 2,
                    x2 : parentBox.x,
                    y2 : parentBox.y + parentBox.height / 2
                });
            }


        }

    });

}(Style));

Style.registerLine('normal', NormalLineStyle);