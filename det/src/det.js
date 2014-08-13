var det = {
    version : '0.0.1'
};
/*global define*/
if (typeof define === 'function' && define.amd) {
    define('det', [], function() {
        return det;
    });
} else {
    window.det = det;
}

det.create = function () {
    return new Toolkit();
};

function noop() {}
