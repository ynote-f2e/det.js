DetMindMap.NODE_EDIT = function edit(context, action) {
    'use strict';

    var name = action.name,
        value = action.value,
        model = context.getModel(),
        originalValue = model[name];
    model[name] = value;
    return function rollback() {
        model[name] = originalValue;
    };
}