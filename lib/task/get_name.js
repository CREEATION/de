"use strict"

const is_task = require("./is_task")

module.exports = function get_name(task) {
  if (!is_task(task)) {
    throw `couldn't get taskname: invalid task`
  }

  return task.displayName || task.function.name
}
