import xulogger = require("xulogger")
import config = require("./config3")

// Create Logger by config
let logger = new xulogger.Logger(config);

logger.Info("Custom Log !!");