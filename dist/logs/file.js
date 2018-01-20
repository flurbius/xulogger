"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var log_1 = require("../log");
var Today = (function () {
    function Today(date) {
        this.year = 0;
        this.month = 0;
        this.day = 0;
        if (date == null)
            date = new Date();
        this.Update(date);
    }
    Today.prototype.Check = function (date) {
        return date.getFullYear() == this.year &&
            date.getMonth() == this.month &&
            date.getDate() == this.day;
    };
    Today.prototype.Update = function (date) {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
    };
    return Today;
}());
var _default_file = "log.txt";
var FileLog = (function () {
    function FileLog(x, file, roll) {
        this._fp = null;
        if (typeof (x) == "number")
            this._config = { level: x, file: file, roll: roll };
        else if (x == null)
            this._config = { level: log_1.Level.All, file: _default_file, roll: false };
        else {
            this._config = x;
            if (this._config.level == null)
                this._config.level = log_1.Level.All;
            if (this._config.file == null)
                this._config.file = _default_file;
        }
        this._config.file = path.normalize(this._config.file);
        this._dirname = path.dirname(this._config.file);
        this._ext = path.extname(this._config.file);
        this._basename = path.basename(this._config.file, this._ext);
        var f = this._config.file;
        this._today = new Today();
        if (fs.existsSync(this._config.file)) {
            var stat = fs.statSync(this._config.file);
            if (!stat.isFile())
                return;
            this._today.Update(stat.mtime);
            FileLog.RollFile(this, new Date());
        }
        this._fp = fs.openSync(this._config.file, "a");
    }
    FileLog.RollFile = function (log, date) {
        if (!log._today.Check(date)) {
            if (log._fp != null) {
                fs.closeSync(log._fp);
                log._fp = null;
            }
            var y = log._today.year.toString();
            var m = (log._today.month + 1).toString();
            if (m.length < 2)
                m = '0' + m;
            var d = log._today.day.toString();
            if (d.length < 2)
                d = '0' + d;
            fs.renameSync(log._config.file, log._dirname + "/" + log._basename +
                ("." + y + "-" + m + "-" + d) + log._ext);
            log._today.Update(date);
        }
    };
    FileLog.prototype.Log = function (level, message) {
        var _this = this;
        if ((level & this._config.level) == 0)
            return;
        if (this._fp == null)
            return;
        if (this._config.roll) {
            var log_2 = this;
            setImmediate(function () {
                var now = new Date();
                FileLog.RollFile(log_2, now);
                if (log_2._fp == null)
                    log_2._fp = fs.openSync(_this._config.file, "a");
                var msg = "[" + log_1.Level[level] + "] " + now.toLocaleString() + ": " + message + "\x0d\x0a";
                fs.write(log_2._fp, msg, function () { });
            });
        }
        else {
            var msg = "[" + log_1.Level[level] + "] " + new Date().toLocaleString() + ": " + message + "\x0d\x0a";
            fs.write(this._fp, msg, function () { });
        }
    };
    return FileLog;
}());
exports.FileLog = FileLog;
//# sourceMappingURL=file.js.map