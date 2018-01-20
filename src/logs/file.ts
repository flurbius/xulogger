/* Copyright xerysherry 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
        return date.getFullYear() == this.year &&
            date.getMonth() == this.month &&
            date.getDate() == this.day;
    }
    Update(date:Date):void {
        this.year = date.getFullYear();
        this.month = date.getMonth();
        this.day = date.getDate();
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
            if(log._fp != null)
            {
                fs.closeSync(log._fp);
                log._fp = null;
            }
            let y = log._today.year.toString();
            let m = (log._today.month+1).toString();
            if (m.length < 2)
                m = '0' + m;
            let d = log._today.day.toString();
            if (d.length < 2)
                d = '0' + d;
            fs.renameSync(log._config.file,
                log._dirname + "/" + log._basename +
                `.${y}-${m}-${d}` + log._ext);
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

        let f = this._config.file;
        this._today = new Today();
        if(fs.existsSync(this._config.file))
        {
            let stat = fs.statSync(this._config.file);
            if(!stat.isFile())
                return;
            this._today.Update(stat.mtime);
            FileLog.RollFile(this, new Date());
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
            let msg = "[" + LogLevel[level] + "] " + new Date().toLocaleString() + ": " + message + "\x0d\x0a";
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