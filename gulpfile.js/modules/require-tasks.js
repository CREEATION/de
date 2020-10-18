"use strict"

function register_magic_tasks(tasks, magic_task_key) {
  tasks.forEach((task) => {
    if (task.hasOwnProperty(magic_task_key)) {
      tasks.push(task[magic_task_key])
    }
  })
}

module.exports = function require_tasks(tasks = []) {
  tasks = tasks.map((task) =>
    require(`${process.cwd()}/gulpfile.js/tasks/${task}`)
  )

  // register magical cleaner and watcher tasks for every task
  register_magic_tasks(tasks, "clean")
  register_magic_tasks(tasks, "watch")

  // sort tasks
  const default_task = tasks.find((task) => task.displayName === "default")

  tasks = tasks
    .filter((task) => task.displayName !== "default")
    .sort((a, b) =>
      a.displayName < b.displayName ? -1 : a.displayName > b.displayName ? 1 : 0
    )

  tasks.unshift(default_task)

  return tasks
}
