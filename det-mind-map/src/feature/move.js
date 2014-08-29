
var DragMove =  (function (DragFeature, MoveCommand) {
    'use strict';

    return DragFeature.derive({

        onDragMove : function (offsetX, offsetY) {
            if (!this.proxy &&
                    (Math.abs(offsetX) > 5 ||
                        Math.abs(offsetY) > 5)) {
                this.initDragMove();
                return;
            } else if (this.proxy) {
                this.targating(offsetX, offsetY);
            }
        },

        initDragMove : function () {

            var ctrl = this.getCtrl(),
                svg = ctrl.getSVG(),
                figures = [],
                boxes = {};

            if (ctrl === ctrl.getRootCtrl()) {
                return;
            }

            function nestedClone(ctrl) {
                var children = ctrl.getChildren();
                if (children.length == 0) {
                    return;
                }
                children.forEach(function (child) {
                    var clone = child.getFigure().clone();
                    figures.push(clone);
                    nestedClone(child);
                });
            }

            function nestedFetchBox(child) {
                boxes[child.$id()] = child.getRect().getBBox();
                child.getChildren().forEach(nestedFetchBox);
            }

            this.cloneRoot = ctrl.getRect().clone();
            figures.push(ctrl.getText().clone(), this.cloneRoot);
            nestedClone(ctrl);
            nestedFetchBox(ctrl.getRootCtrl());

            this.boxes = boxes;
            this.proxy = svg.group.apply(svg, figures);
            this.proxy.attr({
                'fill-opacity' : 0.45,
                'stroke-opacity' : 0.45
            })
            return this.proxy;
        },

        targating : function (offsetX, offsetY) {
            var ctrl = this.getCtrl(),
                boxes = this.boxes,
                rootBox = boxes[ctrl.$id()],
                box = {
                    width : rootBox.width,
                    height : rootBox.height,
                    x : rootBox.x + offsetX,
                    y : rootBox.y + offsetY
                }, ctrl = this.getCtrl(),
                minDist = Number.MAX_VALUE,
                nearest = null,
                nearestBox = null;

            this.proxy.transform('translate(' +
                offsetX + ',' + offsetY + ')');

            nestedCompare(this.getCtrl().getRootCtrl());

            if (nearest) {
                this.drawHint(box, nearestBox);
            } else {
                this.clearHint();
            }
            this.target = nearest;

            function nestedCompare(child) {
                var dist,
                    childBox = boxes[child.$id()];
                if (child === ctrl) {
                    return;
                }
                if (child !== ctrl.getParent()) {
                    dist = getDistance(box, childBox);
                    if (minDist > dist && dist < 250) {
                        nearest = child;
                        nearestBox = childBox;
                        minDist = dist;
                    }
                }
                child.getChildren().forEach(nestedCompare);
            }

            function getDistance(box1, box2) {
                var c1 = {
                        x : box1.x + box1.width / 2,
                        y : box1.y + box1.height / 2
                    },
                    c2 = {
                        x : box2.x + box2.width / 2,
                        y : box2.y + box2.height / 2
                    }
                return Math.sqrt(Math.pow(c1.x - c2.x, 2) +
                    Math.pow(c1.y - c2.y, 2))
            }
        },

        onDragEnd : function() {
            if (this.proxy) {
                this.proxy.remove();
            }
            this.proxy = null;
            this.boxes = null;
            this.cloneRoot = null;
            this.clearHint();
            if (!this.target) {
                return;
            }
            this.doMove(this.target);
        },

        doMove : function (targetCtrl) {
            var ctrl = this.getCtrl();
            ctrl.execute(new MoveCommand(ctrl.getModel(),
                ctrl.getParent().getModel(), targetCtrl.getModel()))
        },

        drawHint : function(fromBox, toBox) {
            var paper = this.getCtrl().getSVG();
            if (!this.hintRect) {
                this.hintRect = paper.rect({
                    rx : 8,
                    yx : 8,
                    fillOpacity : 0,
                    strokeOpacity : 0.5,
                    stroke : 'red',
                    strokeWidth : '3'
                });
            }
            this.hintRect.attr({
                x : toBox.x - 4,
                y : toBox.y - 4,
                width : toBox.width + 8,
                height : toBox.height + 8
            });
            if (!this.hintLine) {
                this.hintLine = paper.line(0, 0, 0, 0);
                this.hintLine.attr({
                    strokeOpacity : 0.5,
                    stroke : 'red',
                    strokeWidth : '3'
                });
            }
            if (fromBox.y + fromBox.height < toBox.y) {
                this.hintLine.attr({
                    x1 : fromBox.x + fromBox.width / 2,
                    y1 : fromBox.y + fromBox.height,
                    x2 : toBox.x + toBox.width / 2,
                    y2 : toBox.y - 5
                });
            } else if (toBox.y + toBox.height < fromBox.y) {
                this.hintLine.attr({
                    x1 : fromBox.x + fromBox.width / 2,
                    y1 : fromBox.y,
                    x2 : toBox.x + toBox.width / 2,
                    y2 : toBox.y + toBox.height + 5
                });
            }else {
                if (fromBox.x > toBox.x + toBox.width) {
                    this.hintLine.attr({
                        x1 : fromBox.x,
                        y1 : fromBox.y + fromBox.height /2,
                        x2 : toBox.x + toBox.width + 5,
                        y2 : toBox.y + toBox.height / 2
                    });
                } else if (fromBox.x + fromBox.width < toBox.x) {
                    this.hintLine.attr({
                        x1 : fromBox.x + fromBox.width,
                        y1 : fromBox.y + fromBox.height /2,
                        x2 : toBox.x - 5,
                        y2 : toBox.y + toBox.height / 2
                    });
                } else {
                    this.hintLine.attr({
                        x1 : 0,
                        y1 : 0,
                        x2 : 0,
                        y2 : 0
                    });
                }
            }

        },

        clearHint : function() {
            if (this.hintRect) {
                this.hintRect.remove();
                this.hintRect = null;
            }
            if (this.hintLine) {
                this.hintLine.remove();
                this.hintLine = null;
            }
        }

    });


}(det.DragFeature, detMindMap.MoveCommand));