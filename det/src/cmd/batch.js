det.BatchCommand = (function (det) {

    'use strict';

    return det.derive(function (commands) {
        this.commands = commands;
    }, {

        execute : function () {
            this.commands.forEach(function (cmd) {
                cmd.execute();
            });
            this.commands.reverse();
        },

        undo : function () {
            this.commands.forEach(function (cmd) {
                cmd.undo();
            });
            this.commands.reverse();
        },

        redo : function () {
            this.commands.forEach(function (cmd) {
                cmd.redo();
            });
            this.commands.reverse();
        }

    });

}(det));