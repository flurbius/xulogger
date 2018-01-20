var xulogger = require("xulogger")
exports.config =
[
    // Console Log
    {
        type: "ConsoleLog",
        level: "All", //or xulogger.Level.All
        // default value, struct see colors.ts
        paint: [
            {key:/Error/gi, colors:["red", "underline"]},
            {key:/Warning/gi, colors:"yellow"},
            {key:/Debug/gi, colors:["blue", "bold"]},
            {key:/Info/gi, colors:["green", "bold"]},
            {key:/\d{4}-\d{1,2}-\d{1,2}[ ]+\d{1,2}:\d{2}:\d{2}/g, colors:"g15"},
            {key:/critical|fatal/gi, colors:["brightred", "underline", "bold"]},
            {key:/https{0,1}:\/\/[^ "']*/gi, colors:["green", "underline"]}
        ],
        // default value
        nopaint: false,
    },
    // File Log
    {
        type: "FileLog",
        level: xulogger.Level.All,
        file: "./all_log.txt",
        // roll file, all_log_yyyy_mm_dd.txt ~ all_log.txt
        roll: true,
    }
]