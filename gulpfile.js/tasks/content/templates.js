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
    const formatter = require("gulp-prettier")

    require("pump")(
      [
        src("src/content/*.pug"),
        data(() => {
          return {
            data: {
              info: packagejson,
            },
          }
        }),
        template_engine(),
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
