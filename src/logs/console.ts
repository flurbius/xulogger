import Colors = require("colors.ts");
import { ILog, Level as LogLevel } from "../log";

interface Config
{
    level: LogLevel;
    paint?: Colors.Painter[];
    nopaint?: boolean;
}

const _default_paint = 
[
    {key:/Error/gi, colors:["red", "underline"]},
    {key:/Warning/gi, colors:"yellow"},
    {key:/Debug/gi, colors:["blue", "bold"]},
    {key:/Info/gi, colors:["green", "bold"]},
    {key:/\d{4}-\d{1,2}-\d{1,2}[ ]+\d{1,2}:\d{2}:\d{2}/g, colors:"g15"},
    {key:/critical|fatal/gi, colors:["brightred", "underline", "bold"]},
    {key:/https{0,1}:\/\/[^ "']*/gi, colors:["green", "underline"]}
]

// Console Log
export class ConsoleLog implements ILog
{
    constructor(level:LogLevel);
    constructor(config:any);
    constructor(x:LogLevel|any)
    {
        if(typeof(x) == "number")
             this._config = {level: x, paint: _default_paint};
        else if(x == null)
             // default value
             this._config = {level: LogLevel.Info, paint:_default_paint};
        else
        {
            this._config = <Config>x;
            if(this._config.paint == null)
                this._config.paint = _default_paint;
        }
    }
    Log(level:LogLevel, message:string): void
    {
        if((level & this._config.level) == 0)
            return;
        
        let msg = "[" + LogLevel[level] + "] " + new Date().toLocaleString() + ": " + message;
        if(this._config.nopaint)
            console.log(msg);
        else
            console.log(Colors.paint(this._config.paint, msg));
    }
    private _config: Config;
}
