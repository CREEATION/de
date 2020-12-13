"use strict"

const {
  task_finalize,
  utils_root_dir,
  utils_get_langs,
  utils_template_modifier,
  utils_screenreader_styles,
  utils_log_stream,
  utils_browser_sync_instance,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const packagejson = require(utils_root_dir("/package.json"))

    const path = require("path")
    const { src, dest } = require("gulp")
    const data = require("gulp-data")
    const tap = require("gulp-tap")
    const template_engine = require("gulp-pug")
    const inline_source = require("gulp-inline-source-html")
    const beautifier = require("gulp-prettier")

    const langs = utils_get_langs()

    require("pump")(
      [
        src("src/www/**/*.pug"),
        utils_log_stream(),
        tap((file, t) => {
          const filename = `${path.basename(file.path, ".pug")}.html`
          const filepath = path
            .relative(
              utils_root_dir(),
              path.format({
                dir: path.dirname(file.path),
                base: filename,
              }),
            )
            .split(`src${path.sep}www${path.sep}`)[1]
          const fileurl = path.dirname(filepath).replace(path.sep, "/")

          return t.through(data, [
            () => {
              return {
                data: {
                  info: packagejson,
                  filename,
                  filepath,
                  fileurl,
                  langs,
                },
              }
            },
          ])
        }),
        template_engine({
          basedir: `.${path.sep}`,
          locals: {
            helpers: {
              data: (template, obj) => {
                return utils_template_modifier(template, obj, "data")
              },
              options: (template, obj) => {
                return utils_template_modifier(template, obj, "options")
              },
              screenreader_only: utils_screenreader_styles,
            },
          },
        }),
        inline_source({ compress: true }),
        beautifier(),
        dest("dist"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "templates:compile",
      description: "compiles pug templates to html",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/**/*", "!dist", "!dist/assets/"],
      },
    },
  },
)
