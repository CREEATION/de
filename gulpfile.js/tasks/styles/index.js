"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)
const { parallel, series } = require("gulp")

module.exports = task_finalize(
  // series(require("./compile"), require("./inject")),
  series(require("./compile"), require("./optimize"), require("./inject")),
  {
    metadata: {
      displayName: "styles",
      description: `compiles styles`,
    },
    options: {
      clean: {
        patterns: ["dist/assets/css/"],
      },
      watch: {
        patterns: ["src/styles/**/*", "src/**/*.css"],
      },
    },
  },
)
