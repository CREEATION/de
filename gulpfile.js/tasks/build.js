"use strict"

const { parallel, series } = require("gulp")
const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  series(
    parallel(
      require("./assets/images"),
      require("./assets/fonts"),
      require("./scripts"),
      require("./styles"),
    ),
    require("./templates"),
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
    },
  },
)
