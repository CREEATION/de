"use strict"

const get_name = require("./get-name")

module.exports = function is_default(task) {
  return get_name(task) === "default"
}
