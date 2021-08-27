"use strict"

const { task_finalize, utils_log } = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const sourcemaps = require("gulp-sourcemaps")
    const rename = require("gulp-rename")
    const terser = require("gulp-terser")
    const beautifier = require("gulp-prettier")

    const src_glob = "src/scripts/*.js"
    const src_glob_opt = { dot: true }
    let processed_first_script = false

    require("pump")(
      [
        src(src_glob, src_glob_opt),
        sourcemaps.init(),
        beautifier(),
        dest("dist/assets/js"),
        terser({
          compress: true,
        }),
        rename((path) => {
          path.extname = ".min.js"

          if (!processed_first_script) {
            const number_of_files = require("globby").sync(
              src_glob,
              src_glob_opt,
            ).length

            utils_log(
              {
                text: `> `,
                color: "cyan",
              },
              {
                text: `minifying `,
              },
              {
                text: number_of_files,
                color: "magenta",
              },
              {
                text: ` javascript files...`,
              },
            )

            processed_first_script = true
          }
        }),
        sourcemaps.write("sourcemaps"),
        dest("dist/assets/js"),
      ],
      cb,
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
  },
)
