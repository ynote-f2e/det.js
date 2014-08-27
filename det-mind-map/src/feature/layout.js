var MindLayout = (function (BaseFeature) {

    'use strict';

    var MARGIN = 8;

    return BaseFeature.derive({

        onAttach : function () {},

        onDetach : function () {},

        doLayout : function () {
            this.bufferedLayout();
        },

        bufferedLayout : function () {
            if (this.layoutTimeout) {
                clearTimeout(this.layoutTimeout);
            }
            this.layoutTimeout = setTimeout(
                this.startLayout.bind(this), 0);
        },

        /**
         * 只会被根节点的 layout 调用
         */
        startLayout : function () {
            var rootCtrl = this.getCtrl().getRootCtrl(),
                rootFigure = rootCtrl.getFigure(),
                svgBox = rootCtrl.getSVG().getBBox();

            layoutRoot();
            layoutChildren();

            function layoutRoot() {
                var rootBox = rootFigure.getBBox();
                rootCtrl.setXY((svgBox.width - rootBox.width) / 2,
                    (svgBox.height - rootBox.height) / 2);
            }

            function layoutChildren() {
                var children = rootCtrl.getChildren(),
                    rootBox = rootFigure.getBBox(),
                    heights = [],
                    rightChildren,
                    rightHeight,
                    leftChildren,
                    leftHeight,
                    partIndex;
                children.forEach(function (mainChild) {
                    heights.push(measure(mainChild));
                });
                partIndex = splitTwoParts(heights);

                rightChildren = children.slice(0, partIndex);
                rightHeight = heights.slice(0, partIndex)
                    .reduce(sum, 0);

                leftChildren = children.slice(partIndex, children.length);
                leftHeight = heights.slice(partIndex, heights.length)
                    .reduce(sum, 0);

                rightChildren.forEach(function (childCtrl, index) {
                    var relatedTop = heights.slice(0, index)
                        .reduce(function (sum, value) {
                            return sum + value;
                        }, 0);
                    layoutNestedRight(childCtrl,
                        (svgBox.width + rootBox.width) / 2 + 50,
                        (svgBox.height - rightHeight) /2 + relatedTop
                    );
                });

                leftChildren.reverse();

                leftChildren.forEach(function (childCtrl, index) {
                    var relatedTop = heights.slice(heights.length - index,
                            heights.length)
                        .reduce(function (sum, value) {
                            return sum + value;
                        }, 0);
                    layoutNestedLeft(childCtrl,
                            (svgBox.width - rootBox.width) / 2 - 50,
                            (svgBox.height - leftHeight) /2 + relatedTop
                    );
                });
            }

            function sum(pv, v) {
                return pv + v;
            }

            function layoutNestedRight(childCtrl, x, y) {
                var height = measure(childCtrl),
                    width = childCtrl.getFigure().getBBox().width,
                    children = childCtrl.getChildren();
                childCtrl.setXY(x, y + height / 2);
                children.forEach(function (childCtrl) {
                    layoutNestedRight(childCtrl,
                        x + width + 30, y);
                    y += measure(childCtrl);
                });
            }

            function layoutNestedLeft(childCtrl, x, y) {
                var height = measure(childCtrl),
                    width = childCtrl.getFigure().getBBox().width,
                    children = childCtrl.getChildren();
                childCtrl.setXY(x - width, y + height / 2);
                children.forEach(function (childCtrl) {
                    layoutNestedLeft(childCtrl,
                            x - width - 30, y);
                    y += measure(childCtrl);
                });
            }

            function measure(childCtrl) {
                var children = childCtrl.getChildren(),
                    height = 0;
                if (children.length == 0) {
                    return childCtrl.getFigure()
                        .getBBox().height + MARGIN;
                }
                children.forEach(function (childCtrl) {
                    height += measure(childCtrl);
                });
                return height;
            }

            function splitTwoParts(heights) {
                var i = 0,
                    j = heights.length - 1,
                    leftTotal,
                    rightTotal;
                if (heights.length < 3) {
                    return heights.length;
                }
                rightTotal = heights[i];
                leftTotal = heights[j];
                while (i !== j) {
                    if (rightTotal <= leftTotal) {
                        i++;
                        rightTotal += heights[i];
                    } else if (rightTotal > leftTotal) {
                        j--;
                        leftTotal += heights[j];
                    }
                }
                return i;
            }
        }

    });


}(det.BaseFeature));