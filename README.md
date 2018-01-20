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

xulogger
========

一个简单并强大的logger
![screenshot](https://raw.githubusercontent.com/xerysherry/xulogger/master/screenshot/screenshot.png)

如何安装？
--------

```
npm install xulogger
```

如何使用？
---------

首先，引用它，并创建日志器

```TypeScript
import xulogger = require("xulogger")

//创建日志器
let logger = new xulogger.Logger();
//添加一个命令行日志
logger.AddLog(new xulogger.ConsoleLog(xulogger.Level.All));
//添加一个文件日志
logger.AddLog(new xulogger.FileLog(xulogger.Level.All, "log.txt", true));
```

接下来，就开始记录你的日志吧!

```TypeScript
logger.Info("This is a Info. Enjoy your life! :3");
logger.Debug("Debug Message is very useful! So let's debug it!");
logger.Warning("Warning! Warning! BOSS coming!!")
logger.Error("WTF! Life is a big advantage!");
logger.Info("Easy? Interesting? Get it https://github.com/xerysherry/xulogger !");
```

使用配置
----------

**推荐使用配置** 下面是一个配置的例子

```TypeScript
import xulogger = require("xulogger")
export = [
    //命令行日志
    {
        type: "ConsoleLog",
        level: "All", //or xulogger.Level.All
        //着色配置
        paint: [
            {key:/Error/gi, colors:["red", "underline"]},
            {key:/Warning/gi, colors:"yellow"},
            {key:/Debug/gi, colors:["blue", "bold"]},
            {key:/Info/gi, colors:["green", "bold"]},
        ],
        //是否禁用着色
        nopaint: false,
    },
    //文件日志
    {
        type: "FileLog",
        level: xulogger.Level.All,
        file: "./all_log.txt",
        // 日志翻滚, all_log_yyyy_mm_dd.txt ~ all_log.txt
        // default = false
        roll: true,
    },
]
```

你可以引用它，并同配置创建日志器

```TypeScript
// 引用日志配置
import config = require("./sample_config")
// 用配置创建日志器
let logger = new xulogger.Logger(config);
```

在/config_sample文件夹下, 你可以找到用JavaScript写的日志配置模板

命令日志配置
-----------

```TypeScript
{
    // 日志输出级别，包括
    // Error, Debug, Warning, Info
    // Level_1 (Error)
    // Level_2 (Error | Debug)
    // Level_3 (Error | Debug | Warning)
    // Level_4 (Error | Debug | Warning | Info)
    // All = Level_4
    level: string|xulogger.Level;
    // 着色配置, 相关参看colors.ts <https://github.com/xerysherry/colors.ts>
    paint?: Colors.Painter[];
    // 是否禁用配置
    nopaint?: boolean;
}
```

文件日志配置
---------------

```TypeScript
{
    // 参看命令行配置说明
    level: string|xulogger.Level;
    // 文件路径
    file: string;
    // 文件翻滚, 
    // 启用后，每天的日志会归档到[filename]_yyyy_mm_dd下，
    // 但是当天的文件已经写入[filename][.ext]下
    // 默认为false
    roll?: boolean;
}
```

自定义日志
----------

使用自定义日志，先实现xulogger.ILog接口，像这样：

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

在配置文件中这样定义：

```TypeScript
export = [ 
    {
        type:"Custom",
        custom: "MyCustomLog.js",
        class: "MyCustomLog",
    },
    // 或者
    {
        type:"Custom",
        custom: c => { return new MyCustomLog(c); },
    },
    // 或者
    {
        type:"Custom",
        custom: new MyCustomLog(),
    }
]
```

感谢使用它，希望你喜欢！
