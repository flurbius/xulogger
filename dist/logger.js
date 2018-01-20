"use strict";
exports.__esModule = true;
var log_1 = require("./log");
exports.Level = log_1.Level;
var console_1 = require("./logs/console");
exports.ConsoleLog = console_1.ConsoleLog;
var file_1 = require("./logs/file");
exports.FileLog = file_1.FileLog;
var Logger = (function () {
    function Logger(config) {
        var _this = this;
        this._enable = true;
        this._logs = [];
        if (config != null) {
            config.forEach(function (c) {
                if (c.type == null)
                    return;
                if (c.level == null)
                    c.level = log_1.Level.All;
                else if (typeof (c.level) == "string") {
                    var level = c.level.toLowerCase();
                    switch (level) {
                        case 'error':
                            c.level = log_1.Level.Error;
                            break;
                        case 'warning':
                            c.level = log_1.Level.Warning;
                            break;
                        case 'debug':
                            c.level = log_1.Level.Debug;
                            break;
                        case 'info':
                            c.level = log_1.Level.Info;
                            break;
                        case 'level_1':
                        case 'level1':
                            c.level = log_1.Level.Level_1;
                            break;
                        case 'level_2':
                        case 'level2':
                            c.level = log_1.Level.Level_2;
                            break;
                        case 'level_3':
                        case 'level3':
                            c.level = log_1.Level.Level_3;
                            break;
                        case 'level_4':
                        case 'level4':
                            c.level = log_1.Level.Level_4;
                            break;
                        case 'all':
                            c.level = log_1.Level.All;
                            break;
                        default:
                            c.level = log_1.Level.None;
                    }
                }
                var type = c.type.toLowerCase();
                var log = null;
                switch (type) {
                    case "consolelog":
                        log = new exports.ConsoleLog(c);
                        break;
                    case "filelog":
                        log = new exports.FileLog(c);
                        break;
                    case "custom":
                        {
                            if (typeof (c.custom) == "string") {
                                var j = require(c.custom);
                                if (j == null)
                                    return;
                                log = new j[c["class"]](c);
                            }
                            else if (c.custom instanceof Function)
                                log = c.require(c);
                            else
                                log = c.custom;
                            break;
                        }
                    default:
                        return;
                }
                if (log != null)
                    _this._logs.push(log);
            });
        }
    }
    Logger.prototype.AddLog = function (log) {
        if (log == null)
            return;
        this._logs.push(log);
    };
    Logger.prototype.SetEnable = function (value) {
        if (value === void 0) { value = true; }
        this._enable = true;
    };
    Logger.prototype.Error = function (message) {
        this.Log(log_1.Level.Error, message);
    };
    Logger.prototype.Warning = function (message) {
        this.Log(log_1.Level.Warning, message);
    };
    Logger.prototype.Debug = function (message) {
        this.Log(log_1.Level.Debug, message);
    };
    Logger.prototype.Info = function (message) {
        this.Log(log_1.Level.Info, message);
    };
    Logger.prototype.Log = function (level, message) {
        if (!this._enable || this._logs.length == 0)
            return;
        this._logs.forEach(function (log) {
            log.Log(level, message);
        });
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map