"use strict"

module.exports = function log_stream_current_file() {
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
