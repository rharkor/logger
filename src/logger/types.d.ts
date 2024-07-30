type TMethods = "log" | "info" | "warn" | "error" | "debug" | "trace" | "subLog" | "success"
export type TLogger = typeof console & {
  isInitialized: boolean
  init: () => Promise<void>
  success: (typeof console)["log"]
  subLog: (typeof console)["log"]
  allowDebug: () => boolean
  prefix?: string | (() => string)
  onLog?: (type: TMethods, args: unknown[]) => void
  _log: (typeof console)["log"]
}
