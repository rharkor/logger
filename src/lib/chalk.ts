import type { ChalkInstance } from "chalk"

let gchalk: ChalkInstance | null = null
export const getChalk = () => {
  if (gchalk) return gchalk
  throw new Error("Chalk not loaded")
}

export const loadChalk = async () => {
  if (gchalk) return gchalk
  const resolvedChalk = await import("chalk").then((_chalk) => _chalk.default)
  gchalk = resolvedChalk
  return resolvedChalk
}
