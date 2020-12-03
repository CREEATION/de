"use strict"

const { series } = require("gulp")
const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  series(
    require("./build").clean,
    require("./serve/create"),
    require("./build"),
    require("./serve/init")
  ),
  {
    metadata: {
      displayName: "default",
      description: "runs a series of tasks for rapid development",
      flags: undefined,
    },
  }
)
