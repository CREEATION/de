"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)
const { series } = require("gulp")

module.exports = task_finalize(series(require("./create"), require("./init")), {
  metadata: {
    displayName: "serve",
    description: "runs a browsersync instance & registered watcher tasks",
    flags: undefined,
  },
})
