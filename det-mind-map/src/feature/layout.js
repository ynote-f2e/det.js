var MindLayout = (function (BaseFeature) {

    'use strict';

    return BaseFeature.derive({

        onAttach : function () {
            var ctrl = this.getCtrl(),
                model = ctrl.getModel();
            if (ctrl.isRoot()) {
                model.bind(this.doLayout, this);
            }
            model.bindChildren(this.doLayout, this);
            this.doLayout();
        },

        onDetach : function () {
            var ctrl = this.getCtrl(),
                model = ctrl.getModel();
            if (ctrl.isRoot()) {
                model.unbind(this.doLayout, this);
            }
            model.unbindChildren(this.doLayout, this);
        },

        /**
         * 子节点把 layout 请求委派到根节点
         */
        doLayout : function () {
            var ctrl = this.getCtrl();
            if (ctrl.isRoot()) {
                this.bufferedLayout();
            } else {
                ctrl.getRootCtrl().getLayout().doLayout();
            }
        },

        bufferedLayout : function () {
            if (this.layoutTimeout) {
                clearTimeout(this.layoutTimeout);
            }
            this.layoutTimeout = setTimeout(
                this.startLayout.bind(this)
            );
        },

        /**
         * 只会被根节点的 layout 调用
         */
        startLayout : function () {
            var ctrl = this.getCtrl(),
                svg = ctrl.getSVG();

            layoutRoot();
            layoutNested();

            function layoutRoot() {
                var svgBox = ctrl.getSVG().getBBox(),
                    figure = ctrl.getFigure(),
                    box = figure.getBBox();
                figure.transform('translate(' +
                    ((svgBox.width - box.width) / 2) +
                    ',' +
                    ((svgBox.height - box.height) / 2) + ')');
            }

            function layoutNested() {
                var children = ctrl.getChildren(),
                    heights = [],
                    leftChildren = [],
                    rightChildren = [];
                children.forEach(function (mainChild, index) {
                    heights.push(measure(mainChild));
                });
            }

            function measure(childCtrl) {
                var children = childCtrl.getChildren(),
                    height = 0;
                if (children.length == 0) {
                    return childCtrl.getFigure().getBBox().height;
                }
                children.forEach(function (childCtrl) {
                    height += measure(childCtrl);
                });
                return height;
            }

            function findSplit(heights) {
                var i = 0, j = heights.length - 1;
                if (heights.length < 3) {
                    return heights.length;
                }
                while (i !== j) {
                    if (heights[i] < heights[j]) {

                    }
                }
                return i;
            }

/*
            this.rect.attr({
                'x' : (svgWidth - width) / 2,
                'y' : (svgHeight - height) / 2,
                'width' : width,
                'height' : height,
                'fill' : '#fff',
                'stroke' : "#666",
                'strokeWidth' : '1',
                'rx' : 8,
                'ry' : 8
            });
            this.text.attr({
                'x' : svgWidth / 2,
                'y' : (svgHeight + textHeight) / 2 - 2,
                'text-anchor' : 'middle'
            });*/
        }

    });


}(det.BaseFeature));