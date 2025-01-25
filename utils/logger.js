const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize } = format;

//Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `Level :${level}: Message: ${message}`;
  })
);

//Create a winston Logger
const logger = createLogger({
  level: "info",
  format: combine(json(), colorize(), timestamp()),

  transports: [
    new transports.File({ filename: "logs/error.log" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

module.exports = logger;
