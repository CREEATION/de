"use strict"

const {
  finalize_task,
  root_dir,
} = require(`${process.cwd()}/gulpfile.js/modules`)

const { parallel, series, task, tree } = require("gulp")

function cleaner_tasks() {
  const namespace = "clean:"

  console.log("she", require(root_dir("/gulpfile.js")))

  return require(root_dir("/gulpfile.js")).filter(
    (task) =>
      task.displayName.substr(0, namespace.length) === namespace &&
      task.displayName !== `${namespace}build`
  )
}

module.exports = finalize_task(
  series(task("build"), "fonts", "styles", "templates"), // async() ???
  {
    metadata: {
      displayName: "clean",
      description: "runs all available cleaner tasks",
    },
  }
)
