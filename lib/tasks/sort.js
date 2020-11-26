"use strict"

const get_name = require("../task/get_name")
const is_default = require("../task/is_default")

function sorter_asc(a, b) {
  const taskname_a = get_name(a)
  const taskname_b = get_name(b)

  if (taskname_a < taskname_b) {
    return -1
  }

  if (taskname_a > taskname_b) {
    return 1
  }

  return 0
}

module.exports = function sort_tasks(tasks = []) {
  if (!tasks.length) {
    return tasks
  }

  const default_task = tasks.find((task) => is_default(task))

  // get all tasks except "default"
  tasks = tasks.filter((task) => !is_default(task))

  tasks.sort(sorter_asc)

  // put "default" task to top of list
  tasks.unshift(default_task)

  return tasks
}
