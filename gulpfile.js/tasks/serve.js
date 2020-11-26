"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  () => {
    require("browser-sync").init({
      notify: true,
      open: false,
      online: false,
      server: "dist",
    })

    require("./assets/images").watch()
    require("./styles").watch()
    require("./templates").watch()
  },
  {
    metadata: {
      displayName: "serve",
      description: "runs a browsersync instance & registered watcher tasks",
      flags: undefined,
    },
  }
)
