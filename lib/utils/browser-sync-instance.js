"use strict"

module.exports = function browsersync_instance(return_name) {
  const instance_name = require("./config")().project.name

  if (return_name) return instance_name

  return require("browser-sync").get(instance_name)
}
