"use strict"

const { finalize_task } = require(`${process.cwd()}/gulpfile.js/modules`)

const { parallel, series } = require("gulp")

module.exports = finalize_task(
  () => {
    require("browser-sync").init({
      notify: true,
      open: false,
      online: false,
      server: "dist",
    })

    require("./assets/images").watch()
    require("./styles").watch()
    require("./content/templates").watch()
  },
  {
    metadata: {
      displayName: "serve",
      description: "runs a browsersync instance & registered watcher tasks",
      flags: undefined,
    },
  }
)
