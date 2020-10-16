"use strict"

const { finalize_task } = require(`${process.cwd()}/gulpfile.js/modules`)

const { series } = require("gulp")

module.exports = finalize_task(
  series(require("./build").clean, require("./build"), require("./serve")),
  {
    metadata: {
      displayName: "default",
      description: "runs a series of tasks for rapid development",
      flags: undefined,
    },
  }
)
