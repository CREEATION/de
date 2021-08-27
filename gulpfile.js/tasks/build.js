"use strict"

const { parallel } = require("gulp")
const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  parallel(
    require("./templates"),
    require("./assets/images"),
    require("./scripts"),
    require("./styles"),
    require("./assets/fonts")
  ),
  {
    metadata: {
      displayName: "build",
      description: "runs all necessary tasks without live-reloading",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/**/*", "!dist", "!dist/.gitkeep"],
      },
      watch: {
        patterns: ["src/**/*"],
      },
    },
  }
)
