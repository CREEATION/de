"use strict"

const is_task = require("./is-task")

module.exports = function get_name(task) {
  if (!is_task(task)) {
    throw `couldn't get taskname: invalid task`
  }

  return require("ansi-colors").unstyle(task.displayName || task.function.name)
}