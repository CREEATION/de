"use strict"

module.exports = function log_stream() {
  return require("gulp-tap")((file) => {
    require("./log")(
      {
        text: "~ ",
        color: "cyan",
      },
      {
        text: require("path").relative(require("./root-dir")(), file.path),
        color: "gray",
      }
    )
  })
}
