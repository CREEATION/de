"use strict"

const { finalize_task } = require(`${process.cwd()}/gulpfile.js/modules`)

module.exports = finalize_task(
  (cb) => {
    const { src, dest } = require("gulp")

    require("pump")(
      [
        src("src/assets/fonts/**/*"),
        dest("dist/assets/fonts"),
        require("browser-sync").stream(),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "fonts",
      description: "copy (& optimize?) font files",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/assets/fonts/"],
      },
    },
  }
)
