"use strict"

const { task_finalize, utils_root_dir } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const preprocessor = require("gulp-postcss")
    const preprocessor_config = require(utils_root_dir("/postcss.config.js"))
    const minifier = require("gulp-csso")
    const beautifier = require("gulp-prettier")

    require("pump")(
      [
        src("src/styles/*.css", {
          dot: true,
        }),
        sourcemaps.init(),
        preprocessor(preprocessor_config),
        minifier({ restructure: true, forceMediaMerge: true }),
        beautifier(),
        sourcemaps.write("sourcemaps"),
        dest("dist/assets/css"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "styles:compile",
      description: "transforms css using postcss",
      flags: undefined,
    },
  },
)
