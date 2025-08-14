import { getChalk } from "@/lib/chalk"
import { TLogger } from "./types"

import { yellow, black, blue, gray, green, orange, red, text } from "./constants"

const printColor =
  (bg?: string, text?: string) =>
  (...args: unknown[]) => {
    if (isBrowser()) return args
    try {
      // This may be crash if chalk is not loaded
      const chalk = getChalk()
      const data = args.map((arg) => {
        if (typeof arg === "object" && arg) {
          return arg
        }
        if (bg && text) return chalk.bgHex(bg).hex(text)(arg)
        if (bg) return chalk.bgHex(bg)(arg)
        if (text) return chalk.hex(text)(arg)
        return arg
      })
      return data
    } catch (e) {
      return args
    }
  }

export const _log = printColor(undefined, undefined)
export const log = printColor(undefined, text)

export const warn = printColor(yellow, black)
export const warnText = printColor(undefined, yellow)

export const debug = printColor(orange, black)
export const debugText = printColor(undefined, orange)

export const error = printColor(red, black)
export const errorText = printColor(undefined, red)

export const success = printColor(green, black)
export const successText = printColor(undefined, green)

export const info = printColor(blue, black)
export const infoText = printColor(undefined, blue)

export const subLog = printColor(undefined, gray)

export function addPrefixToArgs(prefix: TLogger["prefix"], ...args: unknown[]) {
  if (typeof prefix === "string") {
    return [log(prefix), ...args]
  }
  if (typeof prefix === "function") {
    return [log(prefix()), ...args]
  }
  return args
}

const getLoggerEnv = () => process.env.LOGGER_ENV || "production"
export const allowDebug = () => getLoggerEnv() === "development"
export const isBrowser = () => typeof window !== "undefined"
