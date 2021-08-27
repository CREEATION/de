"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
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
