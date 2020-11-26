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

  return task
}

module.exports = function finalize_task(task, config = {}) {
  register_task(task, config)

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
