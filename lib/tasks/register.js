"use strict"

module.exports = function register_magic_tasks(tasks, magic_task_key) {
  tasks.forEach((task) => {
    if (task.hasOwnProperty(magic_task_key)) {
      tasks.push(task[magic_task_key])
    }
  })
}
