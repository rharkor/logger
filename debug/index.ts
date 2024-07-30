/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger, task } from "../dist/index.mjs"

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
// testLogger()

const testTask = async () => {
  // const task1 = await task.startTask({
  //   name: "Task 1",
  // })
  // await new Promise((resolve) => setTimeout(resolve, 500))
  // for (let i = 0; i < 50; i++) {
  //   task1.print("This is a task message " + i)
  //   await new Promise((resolve) => setTimeout(resolve, 50))
  // }
  // task1.stop("Task 1 is done")

  const task2 = await task.startTask({
    name: "Task 2",
  })
  await new Promise((resolve) => setTimeout(resolve, 500))
  for (let i = 0; i < 10; i++) {
    if (i === 5) {
      task2.error("This is an error message")
    } else if (i === 3 || i === 7) {
      task2.warn("This is a warning message")
    } else {
      task2.info("This is a task message " + i)
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  task2.stop("Task 2 is done")
}
testTask()
