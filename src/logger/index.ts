import { loadChalk } from "@/lib/chalk"
import { console } from "./constants"
import { TLogger } from "./types"
import {
  addPrefixToArgs,
  allowDebug,
  debugText,
  debug,
  warn,
  warnText,
  error,
  errorText,
  success,
  successText,
  info,
  infoText,
  subLog,
  log,
  _log,
} from "./utils"

export const logger: TLogger = {
  ...console,
  isInitialized: false,
  init: async () => {
    await loadChalk()
    logger.isInitialized = true
  },
  allowDebug,
  _log: (...args: Parameters<(typeof console)["log"]>) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, _log(...args))
    console.log(...value)
    logger.onLog?.("log", value)
  },
  log: (...args: Parameters<(typeof console)["log"]>) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, log(...args))
    console.log(...value)
    logger.onLog?.("log", value)
  },
  debug: (...args: unknown[]) => {
    if (allowDebug()) {
      warnIfNotInitialized()
      const value = addPrefixToArgs(logger.prefix, debug(" DEBUG "), debugText(...args))
      console.debug(...value)
      logger.onLog?.("debug", value)
    }
  },
  warn: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, warn(" WARN "), warnText(...args))
    console.warn(...value)
    logger.onLog?.("warn", value)
  },
  error: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, error(" ERROR "), errorText(...args))
    console.error(...value)
    logger.onLog?.("error", value)
  },
  trace: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, error(" ERROR "), errorText(...args))
    console.trace(...value)
    logger.onLog?.("trace", value)
  },
  success: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, success(" SUCCESS "), successText(...args))
    console.log(...value)
    logger.onLog?.("success", value)
  },
  info: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, info(" INFO "), infoText(...args))
    console.log(...value)
    logger.onLog?.("info", value)
  },
  subLog: (...args: unknown[]) => {
    warnIfNotInitialized()
    const value = addPrefixToArgs(logger.prefix, subLog(...args))
    console.log(...value)
    logger.onLog?.("subLog", value)
  },
}
// Auto init logger
logger.init()

let alreadyWarned = false
const warnIfNotInitialized = () => {
  if (!logger.isInitialized && !alreadyWarned) {
    console.warn("Logger is not initialized yet. Please call and await logger.init()")
    alreadyWarned = true
  }
}

export const loggerExtra = {
  printColor: {
    _log,
    log,
    warn,
    warnText,
    debug,
    debugText,
    error,
    errorText,
    success,
    successText,
    info,
    infoText,
    subLog,
  },
  addPrefixToArgs,
}
