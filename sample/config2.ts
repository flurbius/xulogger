import xulogger = require("xulogger");
export = [
    // Console Log
    {
        type: "ConsoleLog",
        level: "All", //or xulogger.Level.All
    },
    // Error Log
    {
        type: "FileLog",
        level: xulogger.Level.Error,
        file: "./err.txt",
    },
    // except Error
    {
        type: "FileLog",
        level:  xulogger.Level.Warning | 
                xulogger.Level.Debug | 
                xulogger.Level.Info,
        file: "./other.txt",
        roll: true,
    },
]