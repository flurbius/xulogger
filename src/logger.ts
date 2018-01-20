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
        this._logs = [];
        if(config != null)
        {
            config.forEach(c =>{
                if(c.type == null)
                    return;
                if(c.level == null)
                    c.level = Level.All;
                else if(typeof(c.level) == "string")
                {
                    let level = c.level.toLowerCase();
                    switch(level)
                    {
                        case 'error':
                            c.level = Level.Error;
                            break;
                        case 'warning':
                            c.level = Level.Warning;
                            break;
                        case 'debug':
                            c.level = Level.Debug;
                            break;
                        case 'info':
                            c.level = Level.Info;
                            break;
                        case 'level_1':
                        case 'level1':
                            c.level = Level.Level_1;
                            break;
                        case 'level_2':
                        case 'level2':
                            c.level = Level.Level_2;
                            break;
                        case 'level_3':
                        case 'level3':
                            c.level = Level.Level_3;
                            break;
                        case 'level_4':
                        case 'level4':
                            c.level = Level.Level_4;
                            break;
                        case 'all':
                            c.level = Level.All;
                            break;
                        default:
                            c.level = Level.None;
                    }
                }

                let type = c.type.toLowerCase();
                let log:ILog = null;
                switch(type)
                {
                    case "consolelog":
                        log = new ConsoleLog(c);
                        break
                    case "filelog":
                        log = new FileLog(c);
                        break;
                    case "custom":
                    {
                        if(typeof(c.custom) == "string")
                        {
                            var j = require(c.custom);
                            if(j == null)
                                return;
                            log = new j[c.class](c);
                        }
                        else if(c.custom instanceof Function)
                            // Function
                            log = c.require(c);
                        else
                            // Object
                            log = c.custom;
                        break;
                    }
                    default:
                        return;
                }
                if(log != null)
                    this._logs.push(log);
            });
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
        if(!this._enable || this._logs.length == 0)
            return;
        this._logs.forEach(log=> {
            log.Log(level, message);
        })
    }
    private _enable: boolean = true;
    private _logs: ILog[];
}

