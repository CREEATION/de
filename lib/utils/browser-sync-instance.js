"use strict"

module.exports = function browsersync_instance(return_name) {
  const browser_sync = require("browser-sync")
  const instance_name = require("./config")().project.name

  if (return_name) return instance_name

  if (browser_sync.has(instance_name)) {
    return browser_sync.get(instance_name)
  }

  return browser_sync
}
