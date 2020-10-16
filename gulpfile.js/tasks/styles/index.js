"use strict"

const {
  finalize_task,
  root_dir,
} = require(`${process.cwd()}/gulpfile.js/modules`)

module.exports = finalize_task(
  (cb) => {
    const packagejson = require(root_dir("/package.json"))

    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const preprocessor = require("gulp-postcss")
    const preprocessor_config = require(root_dir("/postcss.config.js"))
    const minifier = require("gulp-csso")
    const minifier_config = packagejson.config.csso
    const bs = require("browser-sync")

    require("pump")(
      [
        src("src/styles/**/*.css", {
          dot: true,
        }),
        sourcemaps.init(),
        preprocessor(preprocessor_config),
        minifier(minifier_config),
        sourcemaps.write("sourcemaps"),
        dest("dist/css"),
        bs.get("gulp").stream(),
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
        patterns: ["dist/css/"],
      },
      watch: {
        patterns: ["src/**/*.css"],
      },
    },
  }
)
