import xulogger = require("xulogger")

// Create Logger
let logger = new xulogger.Logger();
// Add Console Log
logger.AddLog(new xulogger.ConsoleLog(xulogger.Level.All));
// Add File Log
logger.AddLog(new xulogger.FileLog(xulogger.Level.All, "log.txt", true));

// Logging!
logger.Info("This is a Info. Enjoy your life! :3");
logger.Debug("Debug Message is very useful! So let's debug it!");
logger.Warning("Warning! Warning! BOSS coming!!")
logger.Error("WTF! Life is a big advantage!");
logger.Info("Easy? Interesting? Get it https://github.com/xerysherry/xulogger !");