det.Style = (function (EventSupport) {

    return EventSupport.derive(function (parent, ctrl, styles) {
        EventSupport.call(this);
        this.parent = parent;
        this.ctrl = ctrl;
        this.styles = styles || {};
        this.filters = {};
    }, {

        get : function (name) {
            if (this.styles[name] != null) {
                return this.styles[name];
            }
            if (this.parent) {
                return this.parent.get(name);
            }
            return null;
        },

        refresh : function () {
            var toolkit = this.ctrl.getToolkit(),
                factory = toolkit.getFilterFactory(),
                style,
                filter;
            for (style in this.styles) {
                filter = factory.create(this.ctrl, style);
                if (filter) {
                    filter.render(this.ctrl, this.styles[style]);
                }
            }
        }

    });


}(det.EventSupport));