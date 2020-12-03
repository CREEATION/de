"use strict"

module.exports = function config(plugin_name) {
  const configfile = require(require("./root-dir")("/.gulp.js"))

  if (!plugin_name) return configfile

  return configfile.project.plugins.filter(
    (plugin) => plugin.name === plugin_name
  )[0]
}
