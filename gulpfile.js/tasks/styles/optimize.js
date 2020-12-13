"use strict"

const { task_finalize, utils_log_stream } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const pump = require("pump")
    const { src, dest } = require("gulp")
    const purgecss = require("gulp-purgecss")
    const minifier = require("gulp-csso")
    const rename = require("gulp-rename")

    pump(
      [
        src(["dist/assets/css/**/*.css", "!dist/assets/css/**/*.min.css"]),
        utils_log_stream(),
        // purgecss({
        //   content: ["dist/**/*.html"],
        // }),
        minifier({ restructure: true, forceMediaMerge: true }),
        rename((path) => (path.extname = ".min.css")),
        dest("dist/assets/css"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "styles:optimize",
      description: "minifies css, removes unused css",
      flags: undefined,
    },
  },
)
