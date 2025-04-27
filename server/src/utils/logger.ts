const { createLogger, format, transports } = require("winston");

// Logger configuration
const logger = createLogger({
  level: process.env.NODE_ENV === "prod" ? "info" : "debug",
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json() // Log format to JSON
  ),
  transports: [
    new transports.File({
      level: "error",
      filename: "./logs/all-logs.log",
      handleExceptions: true,
      format: format.json(),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exitOnError: false,
});

// Using morgan stream
logger.stream = {
  write: function (message: any): void {
    logger.info({ message: message.trim() }); // Exclude string message providing
  },
};

export default logger;
