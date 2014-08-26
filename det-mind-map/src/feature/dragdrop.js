
var DragDrop = detMindMap.DragDrop =
    (function (DragDropFeature, MoveCommand) {
        'use strict';

        return DragDropFeature.derive({

            offsetX : 0,
            offsetY : 0,

            onDragMove : function (offsetX, offsetY) {
                var ctrl = this.getCtrl(),
                    parentCtrl = ctrl.getParent(),
                    model = ctrl.getModel(),
                    parentModel = parentCtrl.getModel(),
                    figure = ctrl.getFigure(),
                    children = ctrl.getChildren();
                figure.transform('translate(' +
                    offsetX + ',' + offsetY + ')');
                this.offsetX = offsetX;
                this.offsetY = offsetY;
                if (!ctrl.isRoot()) {
                    ctrl.setLinePosition(
                        model.get('x') + offsetX,
                        model.get('y') + offsetY,
                        model.get('width'),
                        model.get('height'),
                        parentModel.get('x'),
                        parentModel.get('y'),
                        parentModel.get('width'),
                        parentModel.get('height')
                    );
                }
                children.forEach(function (childCtrl) {
                    var childModel = childCtrl.getModel();
                    childCtrl.setLinePosition(
                        childModel.get('x'),
                        childModel.get('y'),
                        childModel.get('width'),
                        childModel.get('height'),
                        model.get('x') + offsetX,
                        model.get('y') + offsetY,
                        model.get('width'),
                        model.get('height')
                    );
                });
            },

            onDragEnd : function () {
                var ctrl = this.getCtrl(),
                    figure = ctrl.getFigure(),
                    model = ctrl.getModel(),
                    offsetX = this.offsetX,
                    offsetY = this.offsetY,
                    cmd = new MoveCommand(model,
                        model.get('x') + offsetX,
                        model.get('y') + offsetY);
                figure.transform('');
                this.offsetX = this.offsetY = 0;
                ctrl.execute(cmd);
            }

        });


    }(det.DragDropFeature, detMindMap.MoveCommand));