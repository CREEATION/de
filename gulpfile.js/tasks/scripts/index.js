"use strict"

const { task_finalize, utils_log } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const rename = require("gulp-rename")
    const terser = require("gulp-terser")
    const beautifier = require("gulp-prettier")

    let processed_first_script = false

    require("pump")(
      [
        src("src/scripts/*.js", {
          dot: true,
        }),
        sourcemaps.init(),
        beautifier(),
        dest("dist/assets/js"),
        terser(),
        rename((path) => {
          path.extname = ".min.js"

          if (!processed_first_script) {
            utils_log(
              {
                text: `>`,
                color: "cyan",
              },
              {
                text: `minifying`,
                color: "reset",
              },
              {
                text: require("globby").sync("src/scripts/*.js", { dot: true })
                  .length,
                color: "magenta",
              },
              {
                text: `javascript files...`,
                color: "reset",
              }
            )

            processed_first_script = true
          }
        }),
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
