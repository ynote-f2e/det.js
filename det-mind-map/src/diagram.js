function DiagramCtrl(context) {
    var model = context.getModel(),
        nodes = model.nodes,
        connections = model.connections;

    nodes.forEach(function (node) {
        context.model('mind-map/model/node', node);
    });
    connections.forEach(function (connection) {
        context.model('mind-map/model/connection', connection);
    });

    context.bind('mind-map/action/add-node', performAddNode);
    context.bind('mind-map/action/add-connection', performAddConnection);

    function performAddNode(action) {
        context.addChild('mind-map/node', {
            x : action.x,
            y : action.y,
            tag : action.tag
        });
    }

    function performAddConnection(action) {

    }

}
