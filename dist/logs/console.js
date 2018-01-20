"use strict";
exports.__esModule = true;
var Colors = require("colors.ts");
var log_1 = require("../log");
var _default_paint = [
    { key: /Error/gi, colors: ["red", "underline"] },
    { key: /Warning/gi, colors: "yellow" },
    { key: /Debug/gi, colors: ["blue", "bold"] },
    { key: /Info/gi, colors: ["green", "bold"] },
    { key: /\d{4}-\d{1,2}-\d{1,2}[ ]+\d{1,2}:\d{2}:\d{2}/g, colors: "g15" },
    { key: /critical|fatal/gi, colors: ["brightred", "underline", "bold"] },
    { key: /https{0,1}:\/\/[^ "']*/gi, colors: ["green", "underline"] }
];
var ConsoleLog = (function () {
    function ConsoleLog(x) {
        if (typeof (x) == "number")
            this._config = { level: x, paint: _default_paint };
        else if (x == null)
            this._config = { level: log_1.Level.Info, paint: _default_paint };
        else {
            this._config = x;
            if (this._config.paint == null)
                this._config.paint = _default_paint;
        }
    }
    ConsoleLog.prototype.Log = function (level, message) {
        if ((level & this._config.level) == 0)
            return;
        var msg = "[" + log_1.Level[level] + "] " + new Date().toLocaleString() + ": " + message;
        if (this._config.nopaint)
            console.log(msg);
        else
            console.log(Colors.paint(this._config.paint, msg));
    };
    return ConsoleLog;
}());
exports.ConsoleLog = ConsoleLog;
//# sourceMappingURL=console.js.map