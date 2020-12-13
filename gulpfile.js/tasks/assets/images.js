"use strict"

const {
  task_finalize,
  utils_parse_imagemin_plugins,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  (cb) => {
    const { src, dest, lastRun } = require("gulp")
    const imagemin = require("gulp-imagemin")

    require("pump")(
      [
        src("src/assets/images/**/*", {
          dot: true,
          since: lastRun(module.exports),
        }),
        imagemin(
          utils_parse_imagemin_plugins(imagemin, {
            gifsicle: {
              plugin_enabled: true,
              interlaced: true,
              optimizationLevel: 3,
            },
            mozjpeg: {
              plugin_enabled: true,
              quality: 77,
            },
            optipng: {
              plugin_enabled: true,
              interlaced: true,
              optimizationLevel: 7,
            },
            svgo: {
              plugin_enabled: true,
              sortAttrs: true,
              removeOffCanvasPaths: true,
              removeScriptElement: true,
              removeStyleElement: true,
              reusePaths: true,
            },
          }),
          // imagemin options
          {
            verbose: false,
          },
        ),
        dest("dist/assets/images"),
      ],
      cb,
    )
  },
  {
    metadata: {
      displayName: "assets:images",
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
  },
)
