"use strict"

const register_magic_tasks = require("./register")

module.exports = function require_tasks(tasks = []) {
  tasks = tasks.map((task) =>
    require(`${process.cwd()}/gulpfile.js/tasks/${task}`)
  )

  // register magical cleaner and watcher tasks for every task
  register_magic_tasks(tasks, "clean")
  register_magic_tasks(tasks, "watch")

  return require("./sort")(tasks)
}
