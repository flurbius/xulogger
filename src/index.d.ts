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

declare namespace xulogger
{
    export enum Level {
        Error, 
        Debug,
        Warning, 
        Info,
        
        // Only Error
        Level_1,
        // Error, Debug
        Level_2,
        // Error, Debug, Warning
        Level_3,
        // Error, Debug, Warning, Info
        Level_4,
        // Error, Debug, Warning, Info
        All,
    }
    export interface ILog {
        Log(level:Level, message:string): void
    }
    export class ConsoleLog {
        Log(level:Level, message:string): void;
    }
    export class FileLog {
        Log(level:Level, message:string): void;
    }
    export class Logger
    {
        constructor(config? :any);
        AddLog(appender: ILog): void;
        SetEnable(value? :boolean): void;
        Error(message:string): void;
        Warning(message:string): void;
        Debug(message:string): void;
        Info(message:string): void;
        Log(level:Level, message:string): void;
    }
}
export = xulogger;