xulogger
========

this is a **simple** and **easy** logger!
![screenshot](https://raw.githubusercontent.com/xerysherry/xulogger/master/screenshot/screenshot.png)

How to install?
---------------

```
npm install xulogger
```

How to use?
-----------

First. Please import it and create logger, like this:

```TypeScript
import xulogger = require("xulogger")

// Create Logger
let logger = new xulogger.Logger();
// Add Console Log
logger.AddLog(new xulogger.ConsoleLog(xulogger.Level.All));
// Add File Log
logger.AddLog(new xulogger.FileLog(xulogger.Level.All, "log.txt", true));
```

Next, record your log!

```TypeScript
logger.Info("This is a Info. Enjoy your life! :3");
logger.Debug("Debug Message is very useful! So let's debug it!");
logger.Warning("Warning! Warning! BOSS coming!!")
logger.Error("WTF! Life is a big advantage!");
logger.Info("Easy? Interesting? Get it https://github.com/xerysherry/xulogger !");
```

Use Config
----------

**Use Config is Recommanded!** This is a example config typescript file

```TypeScript
import xulogger = require("xulogger")
export = [
    // Console Log
    {
        type: "ConsoleLog",
        level: "All", //or xulogger.Level.All
        // paint mode value
        paint: [
            {key:/Error/gi, colors:["red", "underline"]},
            {key:/Warning/gi, colors:"yellow"},
            {key:/Debug/gi, colors:["blue", "bold"]},
            {key:/Info/gi, colors:["green", "bold"]},
        ],
        // default = false
        nopaint: false,
    },
    // File Log
    {
        type: "FileLog",
        level: xulogger.Level.All,
        file: "./all_log.txt",
        // roll file, all_log_yyyy_mm_dd.txt ~ all_log.txt
        // default = false
        roll: true,
    },
]
```

You can import it, and create logger

```TypeScript
// Import config file
import config = require("./sample_config")
// Create logger by config
let logger = new xulogger.Logger(config);
```

In /config_sample, you will find config file use by JavaScript.

Console Log Config
------------------

```TypeScript
{
    // log level include
    // Error, Debug, Warning, Info
    // Level_1 (Error)
    // Level_2 (Error | Debug)
    // Level_3 (Error | Debug | Warning)
    // Level_4 (Error | Debug | Warning | Info)
    // All = Level_4
    level: string|xulogger.Level;
    // Paint config, see colors.ts <https://github.com/xerysherry/colors.ts>
    paint?: Colors.Painter[];
    // Paint disable
    nopaint?: boolean;
}
```

File Log Config
---------------

```TypeScript
{
    // see Console Log Config
    level: string|xulogger.Level;
    // filepath
    file: string;
    // roll file, all_log_yyyy_mm_dd.txt ~ all_log.txt
    // default = false
    roll?: boolean;
}
```

Custom Log
----------

Implement xulogger.ILog, like this

```TypeScript
export class MyCustomLog implements xulogger.ILog
{
    constructor(config?:any)
    {}
    Log(level:xulogger.Level, message:string)
    {
        console.log("[MY_CUSTOM_LOG] " + message);
    }
}
```

config like this

```TypeScript
export = [ 
    {
        type:"Custom",
        custom: "MyCustomLog.js",
        class: "MyCustomLog",
    },
    // or
    {
        type:"Custom",
        custom: c => { return new MyCustomLog(c); },
    },
    // or
    {
        type:"Custom",
        custom: new MyCustomLog(),
    }
]
```

Thank you for use. Please Enjoy it.
