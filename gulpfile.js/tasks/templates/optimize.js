"use strict"

const {
  task_finalize,
  utils_browser_sync_instance,
  utils_log_stream,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const pump = require("pump")
    const { src, dest } = require("gulp")
    const critical = require("critical").stream
    const minifier = require("gulp-html-minifier-terser")

    pump(
      [
        src("dist/**/*.html"),
        utils_log_stream(),
        // critical({
        //   base: "dist/",
        //   inline: true,
        //   minify: true,
        //   ignore: {
        //     atrule: ["@font-face"],
        //   },
        //   css: ["dist/assets/css/**/*.css"],
        // }),
        minifier({ collapseWhitespace: true, minifyCSS: true }),
        dest("dist"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "templates:optimize",
      description: "minifies html, inlines critical css",
    },
  },
)
