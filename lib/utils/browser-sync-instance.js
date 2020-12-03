"use strict"

module.exports = function browsersync_instance() {
  return `dev/${require(require("./root-dir")("/.gulp.json")).description}`
}
