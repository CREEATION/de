"use strict"

const {
  task_finalize,
  utils_browser_sync_instance,
} = require(`${process.cwd()}/lib`)
const { parallel, series } = require("gulp")
const pump = require("pump")

module.exports = task_finalize(
  (cb) => {
    utils_browser_sync_instance().reload("*.js")
    cb()
  },
  {
    metadata: {
      displayName: "scripts:inject",
      description: `injects scripts into running browsersync instance`,
    },
  },
)
