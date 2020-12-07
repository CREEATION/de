"use strict"

const { magenta, gray, yellow } = require("ansi-colors")

module.exports = function stylize_task(task) {
  // ON HOLD: gulp-cli bug :(
  return task

  // task list styles for tasks with flags
  if (task.hasOwnProperty("flags") && Array.isArray(task.flags)) {
    const flags_array = task.flags
    task.flags = {}

    // mark task display name
    // >>> not working! gulp-cli bugs :(
    task.displayName = `${task.displayName}${magenta("*")}`

    // mark task description
    task.description = `${magenta.italic("[has flags]")} ${task.description}`

    // stylize task flags
    for (let i = 0; i < flags_array.length; i++) {
      const flag = flags_array[i]

      if (!flag.id) continue

      const flag_name = magenta(flag.id.toUpperCase())
      const flag_description = flag.description
        ? gray.italic(` ${flag.description.trim()}`)
        : ""

      let flag_placeholder = flag.placeholder ? flag.placeholder : ""

      if (typeof flag.placeholder === "string") {
        flag_placeholder = flag.placeholder.trim()
      } else if (Array.isArray(flag.placeholder)) {
        flag_placeholder = flag.placeholder.join(gray("|"))
      }

      task.flags[
        `${flag_name} ${yellow.italic(flag_placeholder)}`
      ] = flag_description
    }
  }

  return task
}
