"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)
const { parallel, series } = require("gulp")

module.exports = task_finalize(
  parallel(require("./fonts"), require("./images")),
  {
    metadata: {
      displayName: "assets",
      description: `compiles assets`,
    },
    options: {
      watch: {
        patterns: ["src/assets/**/*"],
      },
    },
  },
)
