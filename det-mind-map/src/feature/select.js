var MindSelection = (function (BaseFeature) {
    'use strict';

    return BaseFeature.derive({

        getBody : det.noop,

        onAttach : function () {
            this.figure =this.getBody();
            if (!this.binded) {
                this.select = this.select.bind(this);
                this.onHover = this.onHover.bind(this);
                this.unHover = this.unHover.bind(this);
                this.binded = true;
            }
            this.figure.mousedown(this.select);
            this.figure.mouseover(this.onHover);
            this.figure.mouseout(this.unHover);
        },

        onDetach : function () {
            if (!this.figure) {
                return;
            }
            this.figure.unmousedown(this.select);
            this.figure.unmouseover(this.onHover);
            this.figure.unmouseout(this.unHover);

        },

        select : function (e) {
            var ctrl = this.getCtrl(),
                selection = ctrl.getDiagram().getSelection();
            e.stopPropagation();
            ctrl.select();
            if (this.highlight) {
                this.highlight.remove();
            }
            selection.forEach(function (selected) {
                if (selected === ctrl) {
                    return;
                }
                selected.deselect();
            });
        },

        onHover : function () {
            var ctrl = this.getCtrl(),
                figure = ctrl.getFigure(),
                paper = ctrl.getSVG().paper,
                box = this.getBody().getBBox();
            if (ctrl.isSelected()) {
                return;
            }
            if (!this.highlight) {
                return;
            }
            this.highlight = paper.rect({
                x : box.x - 3,
                y : box.y - 3,
                rx : 6,
                ry : 6,
                width : box.width + 6,
                height : box.height + 6,
                fill : 'none',
                strokeOpacity : 0.2,
                stroke : 'blue',
                strokeWidth : '3'
            });
            figure.append(this.highlight);
        },

        unHover : function () {
            if (this.highlight) {
                this.highlight.remove();
            }
        }

    });



}(det.BaseFeature));