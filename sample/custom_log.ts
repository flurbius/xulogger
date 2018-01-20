import xulogger = require("xulogger")

export class MyCustomLog implements xulogger.ILog
{
    constructor(config?:any)
    {
        if(config == null)
            this.label = "NULL";
        this.label = config.label;
        if(this.label == null)
            this.label = "NULL"
    }
    Log(level:xulogger.LogLevel, message:string)
    {
        console.log("[MY_CUSTOM_LOG " + this.label +" ] " + message);
    }
    label:string;
}