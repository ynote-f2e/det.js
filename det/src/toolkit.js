function Toolkit() {

    'use strict';

    var plugins = {},
        ctrls = {};

    function registerPlugin(plugin) {
        if (plugins.hasOwnProperty(plugin.name)) {
            throw 'Plugin ' + plugin.name + ' is already exists.';
        }
        plugins[plugin.name] = plugin;
    }

    function getOrSetController(modelType, ctrlType) {
        if (!ctrlType) {
            return ctrls[modelType];
        }
        ctrls[modelType] = ctrlType;
    }

    function render(el, model) {
        var root,
            graph;
        root = new Context(null, 'root', model, ctrls);
        graph = root.getGraph();
        //render graph to el
    }

    this.render = render;
    this.plugin = registerPlugin;
    this.ctrl = getOrSetController;
}