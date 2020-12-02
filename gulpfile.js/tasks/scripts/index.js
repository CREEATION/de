"use strict"

const { task_finalize } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const rename = require("gulp-rename")
    const terser = require("gulp-terser")
    const beautifier = require("gulp-prettier")

    require("pump")(
      [
        src("src/scripts/*.js", {
          dot: true,
        }),
        sourcemaps.init(),
        beautifier(),
        dest("dist/assets/js"),
        terser(),
        rename((path) => (path.extname = ".min.js")),
        sourcemaps.write("sourcemaps"),
        dest("dist/assets/js"),
        require("browser-sync").stream({ match: "**/*.js" }),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "scripts",
      description: "transforms js",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/assets/js/"],
      },
      watch: {
        patterns: ["src/scripts/**/*.js"],
      },
    },
  }
)
