"use strict"

const { watch } = require("gulp")
const del_cb = require("../utils/del-cb")

function register_task(task, config = {}) {
  if (
    config.hasOwnProperty("metadata") &&
    Object.keys(config.metadata).length
  ) {
    for (const prop in config.metadata) {
      if (
        config.metadata.hasOwnProperty(prop) &&
        typeof config.metadata[prop] !== "undefined"
      ) {
        task[prop] = config.metadata[prop]
      }
    }
  }

  task.displayName = task.displayName || task.name

  // task list styles for tasks with flags
  if (task.hasOwnProperty("flags") && Array.isArray(task.flags)) {
    const flags_array = task.flags
    task.flags = {}

    const { magenta, gray, yellow } = require("ansi-colors")

    // mark task display name
    // >>> not working! gulp-cli bugs :(
    // task.displayName = `${task.displayName}${magenta("*")}`

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

module.exports = function finalize_task(task, config = {}) {
  task = register_task(task, config)

  task.config = Object.assign({}, config)

  if (config.hasOwnProperty("options") && Object.keys(config.options).length) {
    if (
      config.options.hasOwnProperty("clean") &&
      config.options.clean.hasOwnProperty("patterns")
    ) {
      task.clean = register_task(
        async () => {
          await del_cb(config.options.clean.patterns)
        },
        {
          metadata: {
            displayName:
              task.displayName === "build"
                ? "clean"
                : `clean:${task.displayName}`,
            description: `purges "${task.displayName}" task output`,
          },
        }
      )
    }

    if (
      config.options.hasOwnProperty("watch") &&
      config.options.watch.hasOwnProperty("patterns")
    ) {
      task.watch = register_task(
        () => {
          watch(config.options.watch.patterns, task)
        },
        {
          metadata: {
            displayName: `watch:${task.displayName}`,
          },
        }
      )
    }
  }

  return task
}
