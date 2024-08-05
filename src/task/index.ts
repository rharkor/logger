import { loadOra } from "@/lib/ora"
import { TLineKind, windowLog } from "./window"

const levelOrder: {
  [key in TLineKind]: number
} = {
  error: 1,
  warn: 2,
  log: 3,
  info: 4,
  success: 5,
}

/**
 * Start a task with a spinner and a window log
 * @param options
 * @returns
 */
export async function startTask(options: {
  name: string
  successMessage?: string
  maxLines?: number
  noClear?: boolean
}) {
  const { maxLines = 10, name, successMessage } = options
  const ora = await loadOra()
  const spinner = ora({
    text: name,
    isSilent: true,
    isEnabled: false,
  }).start()
  const window = windowLog(maxLines, {
    topPrefix: () => spinner.frame(),
    topInterval: 100,
  })
  const rows = process.stdout.rows
  const curMax = Math.min(maxLines, rows - 2)

  const endPrint: { content: string; kind: TLineKind }[] = []

  const registerHandlePrint = (kind: TLineKind) => (data: string) => {
    const lines = data
      .toString()
      .split("\n")
      .filter((l) => l.length > 0)
      .slice(-curMax - 1)
    lines.forEach((line) => {
      window.print(line + "\n", kind)
    })
    if (kind === "error" || kind === "warn") {
      endPrint.push({ content: data, kind })
    }
  }

  return {
    print: registerHandlePrint("log"),
    log: registerHandlePrint("log"),
    error: registerHandlePrint("error"),
    warn: registerHandlePrint("warn"),
    info: registerHandlePrint("info"),
    success: registerHandlePrint("success"),
    stop: (message?: string) => {
      window.stop({
        successMessage: message ?? successMessage,
        noClear: options.noClear,
        endPrint: endPrint.sort((a, b) => {
          return levelOrder[b.kind] - levelOrder[a.kind]
        }),
      })
    },
  }
}

/**
 * Stop a task
 * @param window
 */
export function stopTask(window: ReturnType<typeof windowLog>, opts?: Parameters<(typeof window)["stop"]>["0"]) {
  window.stop(opts)
}

// Auto load ora
loadOra()
