"use strict"

const is_task = require("./is-task")

module.exports = function get_name(task) {
  if (!is_task(task)) {
    throw `couldn't get taskname: invalid task`
  }

  let taskname = task.displayName

  if (
    Object.entries(task)[0] &&
    typeof Object.entries(task)[0][1] === "function"
  ) {
    taskname = Object.keys(task)[0]
  } else if (task.function && task.function.name) {
    taskname = task.function.name
  }

  return taskname
}
