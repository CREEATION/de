"use strict"

module.exports = function is_task(task) {
  return typeof task === "function"
}
