function Toolkit() {

    var plugins = {},
        ctrls = {};

    function registerPlugin(plugin) {
        if (plugins.hasOwnProperty(plugin.name)){
            throw 'Plugin ' + plugin.name + ' is already exists.';
        };
        plugins[plugin.name] = plugin;
    }

    function getOrSetController(modelType, ctrlType) {
        if (!ctrlType) {
            return ctrls[modelType];
        }
        ctrls[modelType] = ctrlType;
    }

    function render(el, model) {
        var xtype = model.xtype,
            ctrl,
            graph;
        if (!xtype || !ctrls[xtype]) {
            throw 'Model type ' + xtype + ' cannot be found.'
        }
        ctrl = new ctrls[xtype](model);
        graph = ctrl.getGraph();
        //render graph to el
    }

    this.render = render;
    this.plugin = registerPlugin;
    this.ctrl = getOrSetController;
}