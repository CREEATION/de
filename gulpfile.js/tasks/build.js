"use strict"

const { finalize_task } = require(`${process.cwd()}/gulpfile.js/modules`)

const { parallel } = require("gulp")

module.exports = finalize_task(
  parallel(
    require("./assets/fonts"),
    require("./assets/images"),
    require("./content/templates"),
    require("./styles")
  ),
  {
    metadata: {
      displayName: "build",
      description: "runs all necessary tasks without live-reloading",
      flags: undefined,
    },
    options: {
      clean: {
        default: true,
        patterns: ["dist/**/*", "!dist", "!dist/.gitkeep"],
      },
    },
  }
)
