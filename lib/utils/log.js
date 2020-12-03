"use strict"

module.exports = function log(...args) {
  const color = require("ansi-colors")

  const message = []
  const indent = "\n          "

  for (let i = 0; i < args.length; i++) {
    message.push(
      color[args[i].color](i == 0 ? `${args[i].text + indent}` : args[i].text)
    )
  }

  require("fancy-log").info(...message)
}
