"use strict"

module.exports = function root_dir(path = "") {
  return process.cwd() + path.replace("/", require("path").sep)
}
