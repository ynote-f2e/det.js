function GraphCtrl(model, parent) {
    /*global define*/
    var drawer = draw2D,
        children = [],
        selected = false,
        graph;

    /* public */
    this.getModel = getModel;
    this.getDrawer = getDrawer;
    this.getGraph = getGraph;
    this.getParent = getParent;
    this.getChildren = getChildren;
    this.select = select;
    this.deselect = deselect;
    this.isSelected = isSelected;

    /* tobe override */
    this.getModelChildren = noop;
    this.createGraph = noop;
    this.refresh = noop;

    function getChildren() {
        return children;
    }

    function getParent() {
        return parent;
    }

    function getGraph() {
        if (!graph) {
            graph = this.createGraph();
        }
        return graph;
    }

    function getModel() {
        return model;
    }

    function getDrawer() {
        return drawer;
    }

    function select() {
        selected = true;
    }

    function deselect() {
        selected = false;
    }

    function isSelected() {
        return selected;
    }

}

det.ctrl.Graph = GraphCtrl;