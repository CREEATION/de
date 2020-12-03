"use strict"

const {
  task_finalize,
  utils_config,
  utils_log_stream,
  utils_get_langs,
  utils_browser_sync_instance,
} = require(`${process.cwd()}/lib`)
const { magenta } = require("ansi-colors")

const default_lang = utils_config("gulp-html-i18n").config.defaultLang
const default_lang_string = `default language: ${magenta(default_lang)}`

module.exports = task_finalize(
  (cb) => {
    const { src, dest } = require("gulp")
    const i18n = require("gulp-html-i18n")

    require("pump")(
      [
        src(["dist/**/*.html", "!dist/assets", "!dist/system/**/*"]),
        utils_log_stream(),
        i18n(utils_config("gulp-html-i18n").config),
        dest("dist"),
        utils_browser_sync_instance().stream({ once: true }),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "templates:localize",
      description: `takes html files and localizes them (${default_lang_string})`,
      flags: utils_config().tasks["templates"].flags,
    },
    options: {
      clean: {
        patterns: utils_get_langs().map((lang) => `dist/${lang}`),
      },
    },
  }
)
