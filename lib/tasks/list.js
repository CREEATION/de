"use strict"

module.exports = function list_tasks() {
  const tasks_dir = "./gulpfile.js/tasks"
  const tasks_glob_patterns = [
    `${tasks_dir}/**/[!_]*.js`,
    `!${tasks_dir}/**/_*/**`,
  ]

  return require("globby")
    .sync(tasks_glob_patterns)
    .map((task_filepath) =>
      require(`../tasks${task_filepath.split(tasks_dir)[1]}`)
    )
    .filter((task) => typeof task === "function")
}
