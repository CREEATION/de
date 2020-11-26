"use strict"

const { task_finalize, utils_root_dir } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const preprocessor = require("gulp-postcss")
    const preprocessor_config = require(utils_root_dir("/postcss.config.js"))
    const minifier = require("gulp-csso")

    require("pump")(
      [
        src("src/styles/*.css", {
          dot: true,
        }),
        sourcemaps.init(),
        preprocessor(preprocessor_config),
        minifier({
          restructure: true,
        }),
        sourcemaps.write("sourcemaps"),
        dest("dist/assets/css"),
        require("browser-sync").stream({ match: "**/*.css" }),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "styles",
      description: "transforms css using postcss",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/assets/css/"],
      },
      watch: {
        patterns: ["src/styles/**/*", "src/**/*.css"],
      },
    },
  }
)
