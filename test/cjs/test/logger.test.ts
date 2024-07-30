import { describe, test, expect, beforeAll, beforeEach } from "vitest"
import { logger } from "../../../dist/index.cjs"

type TMethods = Parameters<NonNullable<(typeof logger)["onLog"]>>["0"]

const logs: {
  content: unknown[]
  type: TMethods
}[] = []

// Override logger methods so it add log to an array
const overrideLogger = () => {
  logger.onLog = (type, args) => {
    logs.push({ content: args, type })
  }
}

describe("logger", () => {
  beforeAll(() => {
    process.env.LOGGER_ENV = "development"
    // Override logger methods
    overrideLogger()
  })

  beforeEach(() => {
    // Clear logs
    logs.length = 0
  })

  //* Properties
  test("logger should be defined", () => {
    expect(logger).toBeDefined()
  })

  test("logger should have info method", () => {
    expect(logger.info).toBeDefined()
  })

  test("logger should have error method", () => {
    expect(logger.error).toBeDefined()
  })

  test("logger should have warn method", () => {
    expect(logger.warn).toBeDefined()
  })

  test("logger should have debug method", () => {
    expect(logger.debug).toBeDefined()
  })

  test("logger should have trace method", () => {
    expect(logger.trace).toBeDefined()
  })

  //* Print methods
  test("logger should print log", () => {
    logger.log("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[0]).contain("Hello world")
    expect(logs[0].type).toEqual("log")
  })

  test("logger should print info", () => {
    logger.info("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[1]).contain("Hello world")
    expect(logs[0].type).toEqual("info")
  })

  test("logger should print warn", () => {
    logger.warn("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[1]).contain("Hello world")
    expect(logs[0].type).toEqual("warn")
  })

  test("logger should print error", () => {
    logger.error("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[1]).contain("Hello world")
    expect(logs[0].type).toEqual("error")
  })

  test("logger should print debug", () => {
    logger.debug("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[1]).contain("Hello world")
    expect(logs[0].type).toEqual("debug")
  })

  test("logger should print trace", () => {
    logger.trace("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[1]).contain("Hello world")
    expect(logs[0].type).toEqual("trace")
  })

  test("logger should print subLog", () => {
    logger.subLog("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[0]).contain("Hello world")
    expect(logs[0].type).toEqual("subLog")
  })

  //* Disabled logs
  test("logger should not print debug log if debug is disabled", () => {
    process.env.LOGGER_ENV = "production"
    logger.debug("Hello world")
    expect(logs).toHaveLength(0)
  })

  //* Complex logs
  test("Should print stringified object", () => {
    logger._log([{ hello: "world" }])
    expect(logs).toHaveLength(1)
    expect(logs[0].content[0]).contain(JSON.stringify([{ hello: "world" }], null, 2))
  })

  //* Prefix
  test("Should add prefix to log", () => {
    logger.prefix = "prefix"
    logger.log("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[0]).contain("prefix")
    expect(logs[0].content[1]).contain("Hello world")
  })

  test("Should add prefix function result to log", () => {
    logger.prefix = () => "prefix"
    logger.log("Hello world")
    expect(logs).toHaveLength(1)
    expect(logs[0].content[0]).contain("prefix")
    expect(logs[0].content[1]).contain("Hello world")
  })
})
