var UnderLineStyle = (function (Style) {

    var PADDING = {
            X : 5,
            Y : 3
        },
        DEFAULTRECTATTR = {
            fill : 'none',
            rx : 8,
            ry : 8
        },
        DEFAULTLINEATTR = {
            stroke : '#000'
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
                line = paper.line(0, 0, 0, 0),
                text = paper.text(0, 0, text);

            rect.attr({
                stroke : 'none',
                strokeWidth : '0'
            });

            this.rect = rect;
            this.text = text;
            this.line = line;
            this.figure = svg.group(this.rect, this.line, this.text);
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
                rectAttr,
                lineAttr,
                depth,
                strokeWidth;

            textNode.textContent = model.get('text');
                
            textAttr = this.extend(DEFAULTTEXTATTR, model.get('textAttr'));
            this.text.attr(textAttr);

            textBox = this.text.getBBox();
            width = textBox.width + PADDING.X * 2;
            height = textBox.height + PADDING.Y * 2;

            rectAttr = this.extend(DEFAULTRECTATTR, {width: width, height: height});

            this.rect.attr(rectAttr);

            depth = ctrl.getDepth();
            strokeWidth = depth > 3 ? 1 : depth > 2 ? 2 : 3;

            lineAttr = this.extend(this.extend(DEFAULTLINEATTR, 
                                        model.get('rectAttr')),
                                    {strokeWidth: strokeWidth});

            this.line.attr(lineAttr);
        },

        setXY : function (x, y) {
            var ctrl = this.ctrl,
                box,
                textBox;

            textBox = this.text.getBBox();

            this.rect.attr({
                x : x,
                y : y
            });

            this.text.attr({
                x : x + PADDING.X,
                y : y + this.rect.getBBox().height - PADDING.Y - 2
            });

            this.line.attr({
                x1 : x,
                y1 : y + this.rect.getBBox().height,
                x2 : x + this.rect.getBBox().width,
                y2 : y + this.rect.getBBox().height
            })

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

Style.registerRect('underline', UnderLineStyle);