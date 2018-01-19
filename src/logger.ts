import { ILog, Level } from "./log";
exports.Level = Level;

import { ConsoleLog as _ConsoleLog } from "./logs/console";
export let ConsoleLog = _ConsoleLog;
import { FileLog as _FileLog } from "./logs/file";
export let FileLog = _FileLog;

//Logger
export class Logger
{
    constructor(config?:any)
    {
        if(config == null)
            this._logs = [];
        else
        {
            
        }
    }
    AddLog(log: ILog): void {
        if(log == null)
            return;
        this._logs.push(log);
    }
    SetEnable(value:boolean = true): void {
        this._enable = true;
    }
    Error(message:string):void
    {
        this.Log(Level.Error, message);
    }
    Warning(message:string): void
    {
        this.Log(Level.Warning, message);
    }
    Debug(message:string):void
    {
        this.Log(Level.Debug, message);
    }
    Info(message:string):void
    {
        this.Log(Level.Info, message);
    }
    Log(level:Level, message:string): void
    {
        if(!this._enable)
            return;
        this._logs.forEach(log=> {
            log.Log(level, message);
        })
    }
    private _enable: boolean = true;
    private _logs: ILog[];
}

