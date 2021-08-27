"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")

    require("pump")(
      [
        src("src/assets/fonts/**/*.{woff,woff2,txt}"),
        dest("dist/assets/fonts"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "assets:fonts",
      description: "copy (& optimize?) font files",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/assets/fonts/"],
      },
      watch: {
        patterns: ["src/assets/fonts/**/*"],
      },
    },
  },
)
