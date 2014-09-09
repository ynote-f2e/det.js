var NormalRectStyle = (function (Style) {

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
            this.figure = svg.group(this.rect, this.text);
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
            var ctrl = this.ctrl,
                model = ctrl.getModel(),
                textNode = this.text.node,
                width,
                height,
                textBox,
                textAttr,
                rectAttr;

            textNode.textContent = model.get('text');
                
            textAttr = this.extend(DEFAULTTEXTATTR, model.get('textAttr'));
            this.text.attr(textAttr);

            textBox = this.text.getBBox();
            width = textBox.width + PADDING.X * 2;
            height = textBox.height + PADDING.Y * 2;

            rectAttr = this.extend(this.extend(DEFAULTRECTATTR, {width: width, height: height}),
                            model.get('rectAttr'));

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
                y : y + this.rect.getBBox().height - PADDING.Y - 5
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

        getBBox : function () {
            return this.figure.getBBox();
        }

    });

}(Style));

Style.registerRect('normal', NormalRectStyle);