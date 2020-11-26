"use strict"

const {
  task_finalize,
  utils_root_dir,
  utils_template_modifier,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const packagejson = require(utils_root_dir("/package.json"))

    const { src, dest } = require("gulp")
    const data = require("gulp-data")
    const template_engine = require("gulp-pug")
    const formatter = require("gulp-prettier")

    require("pump")(
      [
        src("src/www/**/*.pug"),
        data(() => {
          return {
            data: {
              info: packagejson,
            },
          }
        }),
        template_engine({
          locals: {
            helpers: {
              data: (template, obj) => {
                return utils_template_modifier(template, obj, "data")
              },
              options: (template, obj) => {
                return utils_template_modifier(template, obj, "options")
              },
            },
          },
        }),
        formatter(),
        dest("dist"),
        require("browser-sync").stream(),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "templates",
      description: "compiles pug to html",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/**/*.html", "!dist/assets/"],
      },
      watch: {
        patterns: ["src/**/*.pug", "package.json"],
      },
    },
  }
)
