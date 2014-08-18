function NodeCtrl(context) {
    'use strict';

    var node = context.model();

    context.bind(DetMindMap.MOVE, move);
    context.bind(DetMindMap.EDIT, edit);
    context.bind(DetMindMap.REMOVE, removeThis);

    function removeThis(context) {
        return context.parent()
            .perform(DetMindMap.REMOVE, {
                items : [node]
            });
    }

}