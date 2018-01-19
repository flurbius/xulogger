import fs = require("fs");
import path = require("path");
import timers = require("timers");
import { ILog, Level as LogLevel } from "../log";

interface Config
{
    level: LogLevel;
    file: string;
    roll?: boolean;
}

class Today
{
    constructor(date?: Date) {
        if(date == null)
            date = new Date();
        this.Update(date);
    }
    Check(date:Date):boolean {
        return date.getFullYear() == this.year ||
            date.getMonth() == this.month ||
            date.getDay() == this.day;
    }
    Update(date:Date):void {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDay();
    }
    year: number = 0;
    month: number = 0;
    day: number = 0;
}

const _default_file = "log.txt"

// File Log
export class FileLog implements ILog
{
    private static RollFile(log: FileLog, date: Date): void
    {
        if (!log._today.Check(date)) {
            if(log._fp != 0)
            {
                fs.closeSync(log._fp);
                log._fp = null;
            }
            let y = date.getFullYear().toString();
            let m = date.getMonth().toString();
            if (m.length < 2)
                m = '0' + m;
            let d = date.getDay().toString();
            if (d.length < 2)
                d = '0' + d;
            fs.renameSync(log._config.file,
                log._dirname + "/" + log._basename +
                `_${y}_${m}_${d}` + log._ext);
            log._fp = fs.openSync(log._config.file, "a");
            log._today.Update(date);
        }
    }

    constructor(level:LogLevel, file:string, roll?:boolean);
    constructor(config:any);
    constructor(x:LogLevel|any, file?:string, roll?:boolean)
    {
        if(typeof(x) == "number")
            this._config = {level:x, file:file, roll:roll}
        else if(x == null)
            this._config = {level:LogLevel.All, file:_default_file, roll:false}
        else 
        {
            this._config = <Config>x;
            if(this._config.level == null)
                this._config.level = LogLevel.All;
            if(this._config.file == null)
                this._config.file = _default_file;
        }
        this._config.file = path.normalize(this._config.file);
        this._dirname = path.dirname(this._config.file);
        this._ext = path.extname(this._config.file);
        this._basename = path.basename(this._config.file, this._ext);

        this._today = new Today();

        let f = this._config.file;
        if(fs.existsSync(this._config.file))
        {
            let stat = fs.statSync(this._config.file);
            if(!stat.isFile())
                return;
            FileLog.RollFile(this, stat.mtime);
        }
        this._fp = fs.openSync(this._config.file, "a");
    }

    Log(level:LogLevel, message:string): void
    {
        if((level & this._config.level) == 0)
            return;
        if(this._fp == null)
            return;

        if(this._config.roll)
        {
            let log = this;
            timers.setImmediate(()=>{
                let now = new Date();
                FileLog.RollFile(log, now)
                if(log._fp == null)
                    log._fp = fs.openSync(this._config.file, "a");

                let msg = "[" + LogLevel[level] + "] " + now.toLocaleString() + ": " + message + "\x0d\x0a";
                fs.write(log._fp, msg, ()=>{});
            })
        }
        else
        {
            let msg = "[" + LogLevel[level] + "] " + new Date() + ": " + message + "\x0d\x0a";
            fs.write(this._fp, msg, ()=>{});
        }
    }
    

    private _config: Config;

    private _today: Today;
    private _fp: number = null;

    private _dirname: string;
    private _basename: string;
    private _ext: string;
}