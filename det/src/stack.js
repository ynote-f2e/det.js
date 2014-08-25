var CommandStack = (function (EventSupport) {
    'use strict';

    return EventSupport.derive(function () {
        EventSupport.call(this);
        this.undoStack = [];
        this.redoStack = [];
    }, {

        canRedo : function () {
            return this.redoStack.length > 0;
        },

        canUndo : function () {
            return this.undoStack.length > 0;
        },

        execute : function (cmd) {
            cmd.execute();
            this.undoStack.push(cmd);
            this.redoStack = [];
        },

        redo : function () {
            var cmd;
            if (!this.canRedo()) {
                return;
            }
            cmd = this.redoStack.pop();
            cmd.redo();
            this.undoStack.push(cmd);
        },

        undo : function () {
            var cmd;
            if (!this.canUndo()) {
                return;
            }
            cmd = this.undoStack.pop();
            cmd.undo();
            this.redoStack.push(cmd);
        }

    });

}(det.EventSupport));