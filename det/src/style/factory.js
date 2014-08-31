var FilterFactory = (function (det) {

    return det.derive(function () {
        this.filters = {};
    }, {

        register : function (name, filterClass) {
            this.filters[name] = filterClass;
        },

        create : function (ctrl, name) {
            return new this.filters[name];
        }

    })

}(det))