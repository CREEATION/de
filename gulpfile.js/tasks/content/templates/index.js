"use strict"

const {
  finalize_task,
  root_dir,
} = require(`${process.cwd()}/gulpfile.js/modules`)

module.exports = finalize_task(
  (cb) => {
    const packagejson = require(root_dir("/package.json"))

    const { src, dest } = require("gulp")
    const data = require("gulp-data")
    const template_engine = require("gulp-pug")
    const template_helpers = require(root_dir(
      "/gulpfile.js/tasks/content/templates/pug-helpers"
    ))
    const formatter = require("gulp-prettier")

    require("pump")(
      [
        src("src/content/templates/*.pug"),
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
              data: template_helpers.data,
              options: template_helpers.options,
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
        patterns: ["dist/*.html"],
      },
      watch: {
        patterns: ["src/**/*.pug", "package.json"],
      },
    },
  }
)
