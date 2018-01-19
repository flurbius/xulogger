export enum Level {
    None =      0b1,
    Error =     0b10,
    Debug =     0b100, 
    Warning =   0b1000, 
    Info =      0b10000, 

    Level_1 = Level.None   |Level.Error,
    Level_2 = Level.Level_1|Level.Debug,
    Level_3 = Level.Level_2|Level.Warning,
    Level_4 = Level.Level_3|Level.Info,

    All = Level.Level_4,
};

export interface ILog
{
    Log(level:number, message:string): void
}