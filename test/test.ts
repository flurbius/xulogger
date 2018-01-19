import xulogger = require("../src/logger");
import { Level as LogLevel} from "../src/log";

let logger = new xulogger.Logger();
logger.AddLog(new xulogger.ConsoleLog(LogLevel.All));
logger.AddLog(new xulogger.FileLog(LogLevel.All, "log.txt", true));

logger.Info("This is a Info. Enjoy your life! :3");
logger.Debug("Debug Message is very useful! So let's debug it!");
logger.Warning("Warning! Warning! BOSS coming!!")
logger.Error("WTF! Life is a big advantage!");
logger.Info("Easy? Interesting? Get it https://github.com/xerysherry/xulogger !");