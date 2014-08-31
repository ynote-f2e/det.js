var CtrlFactory = (function () {

    return det.derive(function (toolkit) {
        this.toolkit = toolkit;
        this.ctrls = {
            model : [],
            ctrl : []
        };
    }, {

        register : function (modelClass, ctrlClass) {
            var ctrls = this.ctrls,
                index = ctrls.model.indexOf(modelClass);
            if (index == -1) {
                this.ctrls.model.push(modelClass);
                this.ctrls.ctrl.push(ctrlClass);
            } else {
                this.ctrls.model[index] = modelClass;
                this.ctrls.ctrl[index] = ctrlClass;
            }
        },

        getCtrlClass : function (modelClass) {
            var ctrls = this.ctrls,
                index = ctrls.model.indexOf(modelClass);
            if (index == -1) {
                return null;
            }
            return ctrls.ctrl[index];
        },

        create : function (model) {
            var CtrlClass =  this.getCtrlClass(model.constructor);
            return new CtrlClass(model, this.toolkit);
        }


    });

}(det));