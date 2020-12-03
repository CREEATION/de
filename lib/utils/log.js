"use strict"

module.exports = function log(...args) {
  const color = require("ansi-colors")

  const message = []
  const indent = "\n          "

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "undefined" || !args[i]) {
      continue
    }

    args[i].newline =
      typeof args[i].newline === "undefined" ? false : args[i].newline

    message.push(
      color[args[i].color](
        args[i].newline ? `${args[i].text + indent}` : args[i].text
      )
    )
  }

  require("fancy-log").info(...message)
}
