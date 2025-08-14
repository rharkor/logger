import { logger } from "../dist/index.mjs"

const testLogger = async () => {
  process.env.LOGGER_ENV = "development"

  await logger.init()

  logger.log("This is a log message") // For general logs
  logger.subLog("This is a sub log message") // For sub logs
  logger.info("This is an info message") // For informational messages
  logger.warn("This is a warning message") // For warnings
  logger.error("This is an error message") // For errors
  logger.success("This is a success message") // For success messages
  logger.debug("This is a debug message") // For debugging messages
  logger.prefix = () => new Date().toISOString() // Set a prefix for all logs (can be a string or a function)
  logger.log("This is a log message with a prefix") // For general logs
  logger.log([
    {
      hello: "world",
    },
  ]) // Display objects
}
testLogger()
