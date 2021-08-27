"use strict"

module.exports = function log(...args) {
  const gulplog = require("gulplog")
  const color = require("ansi-colors")

  const message = []
  const indent = "\n           "

  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === "undefined" || !args[i]) {
      continue
    }

    args[i] = {
      text: typeof args[i].text === "undefined" ? "" : args[i].text,
      color: typeof args[i].color === "undefined" ? "reset" : args[i].color,
      newline: args[i].newline === "undefined" ? false : args[i].newline,
      indent: typeof args[i].indent === "undefined" ? indent : "\n",
      sep: typeof args[i].sep === "undefined" ? undefined : args[i].sep,
    }

    if (Array.isArray(args[i].text)) {
      let text_array = []

      for (let ti = 0; ti < args[i].text.length; ti++) {
        text_array.push(color[args[i].color](args[i].text[ti]))

        if (args[i].sep && ti < args[i].text.length - 1) {
          text_array.push(color[args[i].sep.color](args[i].sep.text))
        }
      }

      message.push(text_array.join(""))

      continue
    }

    message.push(
      color[args[i].color](
        args[i].newline ? `${args[i].text + args[i].indent}` : args[i].text
      )
    )
  }

  gulplog.info(message.join(""))
}
