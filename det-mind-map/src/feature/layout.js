var MindLayout = (function (BaseFeature) {

    'use strict';

    var MARGIN = 8;

    return BaseFeature.derive({

        updating : 0,

        onAttach : function () {},

        onDetach : function () {},

        beginUpdate : function () {
            this.updating ++;
        },

        finishUpdate : function () {
            this.updating --;
            if (!this.invalid) {
                return;
            }
            if (this.updating === 0) {
                this.doLayout();
            }
        },

        layout : function () {
            if (this.updating) {
                this.invalid = true;
                return;
            }
            this.doLayout();
        },

        doLayout : function () {
            var rootCtrl = this.getCtrl().getRootCtrl(),
                svgBox = rootCtrl.getSVG().getBBox(),
                boxes = {};

            fetchBoxNested(rootCtrl);
            layoutRoot();
            layoutChildren();

            function fetchBoxNested(ctrl) {
                boxes[ctrl.$id()] = ctrl.getRect().getBBox();
                ctrl.getChildren().forEach(fetchBoxNested);
            }

            function layoutRoot() {
                var rootBox = boxes[rootCtrl.$id()];
                rootCtrl.setXY((svgBox.width - rootBox.width) / 2,
                    (svgBox.height - rootBox.height) / 2);
            }

            function layoutChildren() {
                var children = rootCtrl.getChildren(),
                    rootBox = boxes[rootCtrl.$id()],
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
                        (svgBox.height - rightHeight) / 2 + relatedTop
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
                            (svgBox.height - leftHeight) / 2 + relatedTop
                        );
                });
            }

            function sum(pv, v) {
                return pv + v;
            }

            function layoutNestedRight(childCtrl, x, y) {
                var height = measure(childCtrl),
                    width = boxes[childCtrl.$id()].width,
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
                    width = boxes[childCtrl.$id()].width,
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
                    return boxes[childCtrl.$id()].height + MARGIN;
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
                return (i == heights.length - 1) ? i : i + 1;
            }
        }

    });


}(det.BaseFeature));