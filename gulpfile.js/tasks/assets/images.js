"use strict"

const {
  finalize_task,
  parse_imagemin_plugins,
  root_dir,
} = require(`${process.cwd()}/gulpfile.js/modules`)

module.exports = finalize_task(
  (cb) => {
    const packagejson = require(root_dir("/package.json"))

    const { src, dest, lastRun } = require("gulp")
    const imagemin = require("gulp-imagemin")
    const imagemin_plugins = packagejson.config.imagemin.plugins
    const imagemin_options = packagejson.config.imagemin.options
    const bs = require("browser-sync")

    require("pump")(
      [
        src("src/assets/images/**/*", {
          dot: true,
          since: lastRun(module.exports),
        }),
        imagemin(
          parse_imagemin_plugins(imagemin, imagemin_plugins),
          imagemin_options
        ),
        dest("dist/assets/images"),
        bs.get("gulp").stream(),
      ],
      cb
    )
  },
  {
    metadata: {
      displayName: "images",
      description: "compresses gif/jpg/png/svg files using imagemin",
      flags: undefined,
    },
    options: {
      clean: {
        patterns: ["dist/assets/images/"],
      },
      watch: {
        patterns: ["src/assets/images/**/*"],
      },
    },
  }
)
