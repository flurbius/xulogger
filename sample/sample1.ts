import xulogger = require("xulogger")
import config = require("./config1")

// Create Logger by config
let logger = new xulogger.Logger(config);

logger.Info("This is a Info. Enjoy your life! :3");
logger.Debug("Debug Message is very useful! So let's debug it!");
logger.Warning("Warning! Warning! BOSS coming!!")
logger.Error("WTF! Life is a big advantage!");
logger.Info("Easy? Interesting? Get it https://github.com/xerysherry/xulogger !");