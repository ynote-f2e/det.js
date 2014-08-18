function add(context, action) {
    'use strict';

    var diagram = context.model(),
        newNode =  {
            xtype : 'det-mind/node',
            x : action.x,
            y : action.y
        };

    diagram.nodes.push(newNode);

    return function rollback() {
        var index = diagram.nodes.indexOf(newNode);
        if (index == -1) {
            return;
        }
        diagram.nodes.splice(index, 1);
    };

}
