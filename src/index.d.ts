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