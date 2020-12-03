"use strict"

const get_name = require("../task/get-name")
const is_default = require("../task/is-default")

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
  const cleaner_tasks = tasks
    .filter((task) => get_name(task).startsWith("clean:"))
    .sort(sorter_asc)
  const watcher_tasks = tasks
    .filter((task) => get_name(task).startsWith("watch:"))
    .sort(sorter_asc)

  // get all tasks except "default", "clean:" and "watch:"
  tasks = tasks.filter(
    (task) =>
      !is_default(task) &&
      !get_name(task).startsWith("clean:") &&
      !get_name(task).startsWith("watch:")
  )

  // sort tasks list
  tasks.sort(sorter_asc)

  // always put "default" task to top of list
  tasks.unshift(default_task)

  // always put utility tasks to bottom of list
  tasks.push(...watcher_tasks)
  tasks.push(...cleaner_tasks)

  return tasks
}
