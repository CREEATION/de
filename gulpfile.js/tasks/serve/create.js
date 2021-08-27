"use strict"

const {
  task_finalize,
  utils_log,
  utils_config,
} = require(`${process.cwd()}/lib`)
const { magenta } = require("ansi-colors")

const browsersync_instance_name = utils_config().project.name
const browsersync_instance_name_string = `id: "${magenta(
  browsersync_instance_name
)}"`

module.exports = task_finalize(
  (cb) => {
    const instance = require("browser-sync").create(browsersync_instance_name)

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
      description: `creates a dumb browsersync instance (${browsersync_instance_name_string})`,
      flags: undefined,
    },
  }
)
