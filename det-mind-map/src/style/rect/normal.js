var NormalRectStyle = (function (Style) {

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
    var PADDING = {
                X : 10,
                Y : 6
        },
        DEFAULTRECTATTR = {
            fill : '#fff',
            stroke : "#666",
            strokeWidth : '1',
            rx : 8,
            ry : 8
        },
        DEFAULTTEXTATTR = {
            'text-anchor' : 'start'
        };

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

            this.rect = rect;
            this.text = text;
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
            var ctrl = this.ctrl,
                model = ctrl.getModel(),
                textNode = this.text.node,
                width,
                height,
                textBox,
                textAttr,
                rectAttr;

            textNode.textContent = model.get('text');
                
            textAttr = extend(DEFAULTTEXTATTR, model.data.textAttr);
            this.text.attr(textAttr);

            textBox = this.text.getBBox();
            width = textBox.width + PADDING.X * 2;
            height = textBox.height + PADDING.Y * 2;

            rectAttr = extend(extend(DEFAULTRECTATTR, {width: width, height: height}),
                            model.data.rectAttr);

            this.rect.attr(rectAttr);
        },

        setXY : function (x, y) {
            var ctrl = this.ctrl,
                box;

            this.rect.attr({
                x : x,
                y : y
            });

            this.text.attr({
                x : x + PADDING.X,
                y : y + this.rect.getBBox().height - PADDING.Y - 2
            });

            if (ctrl.selectRect) {
                box = ctrl.rect.getBBox();
                ctrl.selectRect.attr({
                    x : box.x - 2,
                    y : box.y - 2,
                    width : box.width + 4,
                    height : box.height + 4
                });
            }
        },

        setAttr : function (attr) {
            var ctrl = this.ctrl;

            this.rect.attr(attr);
        },

        getNode : function() {
            return this.rect.node;
        },

        getBBox : function () {
            return this.rect.getBBox();
        }

    });

}(Style));

Style.registerRect('normal', NormalRectStyle);