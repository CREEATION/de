"use strict"

const { task_finalize, utils_config } = require(`${process.cwd()}/lib`)
const { series } = require("gulp")
const { magenta } = require("ansi-colors")

const default_lang = utils_config("gulp-html-i18n").config.defaultLang
const default_lang_string = `default language: ${magenta(default_lang)}`

module.exports = task_finalize(
  series(
    require("./compile"),
    require("./localize").clean,
    require("./localize")
  ),
  {
    metadata: {
      displayName: "templates",
      description: `compiles templates (${default_lang_string})`,
      flags: utils_config().tasks["templates"].flags,
    },
    options: Object.assign(
      {
        watch: {
          patterns: ["src/**/*.pug", "src/lang/**/*", "package.json"],
        },
      },
      require("./compile").config.options,
      require("./localize").config.options
    ),
  }
)
