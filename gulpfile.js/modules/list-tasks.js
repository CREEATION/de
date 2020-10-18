"use strict"

const globby = require("globby")

module.exports = function list_tasks() {
  const tasks_dir = "./gulpfile.js/tasks"
  let tasks = globby
    .sync([`${tasks_dir}/**/[!_]*.js`, `!${tasks_dir}/**/_*/**`])
    .map((filepath) => {
      filepath = filepath.split(tasks_dir)[1]

      return require(`../tasks${filepath}`)
    })

  return tasks.filter((task) => typeof task === "function")
}
