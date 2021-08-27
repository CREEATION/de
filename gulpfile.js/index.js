"use strict"

const { tasks_require, task_get_name } = require("../lib")

// put into config or get automatically in tasks_require (with a prefix?)
// filters all subtasks of specified tasks and adds a sample entry instead
const tasks_overwrite_with_sample = ["clean", "watch"]

let tasks = tasks_require([
  "assets/fonts",
  "assets/images",
  "build",
  "clean",
  "default",
  "scripts",
  "serve",
  "styles",
  "templates",
  "templates/compile",
  "templates/localize",
  "watch",
])

// filter out tasks overwritten by samples
for (let i = 0; i < tasks_overwrite_with_sample.length; i++) {
  const task_with_sample = tasks_overwrite_with_sample[i]
  const task_regex = new RegExp(`${task_with_sample}:(?!taskname).+`)

  tasks = tasks.filter((task) => !task_regex.test(task_get_name(task)))
}

// actually export tasks now
for (let i = 0; i < tasks.length; i++) {
  const task_function = Object.entries(tasks[i])[0][1]
  const task = typeof task_function === "function" ? task_function : tasks[i]
  const task_name = task_get_name(tasks[i])

  module.exports[task_name] = task
}
