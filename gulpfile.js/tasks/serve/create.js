"use strict"

const {
  task_finalize,
  utils_browser_sync_instance,
  utils_log,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const instance = require("browser-sync").create(
      utils_browser_sync_instance()
    )

    utils_log(
      {
        text: "> ",
        color: "cyan",
      },
      {
        text: "Created Browsersync Instance '",
      },
      {
        text: instance.name,
        color: "green",
      },
      {
        text: "'",
      }
    )

    cb()
  },
  {
    metadata: {
      displayName: "serve:create",
      description: "creates a dumb browsersync instance",
      flags: undefined,
    },
  }
)
