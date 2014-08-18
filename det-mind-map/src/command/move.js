function move(context, action) {
    'use strict';
    var model = context.model(),
        originalX = model.x,
        originalY = model.y;
    model.x = action.x;
    model.y = action.y;
    return function rollback() {
        model.x = originalX;
        model.y = originalY;
    };
}