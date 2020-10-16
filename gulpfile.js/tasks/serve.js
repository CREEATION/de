"use strict"

const {
  finalize_task,
  root_dir,
} = require(`${process.cwd()}/gulpfile.js/modules`)

module.exports = finalize_task(
  () => {
    const { tree, watch } = require("gulp")
    const gulpfile = require(root_dir("/gulpfile.js"))

    require("browser-sync").init(
      require(root_dir("/package.json")).config.browserSync
    )

    // register watchers
    console.log(gulpfile)

    // tree().nodes.forEach((taskname) => {

    // })

    // watchers.forEach((watcher) => {
    //   watch(watcher.patterns, watcher.task)
    // })
  },
  {
    metadata: {
      displayName: "serve",
      description: "creates a browsersync instance & watches files",
      flags: undefined,
    },
  }
)

// register task names, cleaner tasks & populate watchers array
// gulp.forEach((task) => {
//   const taskname = task.displayName || task.function.name

//   // set taskname so gulp can gulp it
//   task.displayName = taskname

//   if (task.clean) {
//     const cleaner_task = function _clean(cb) {
//       delete_contents(task.clean.patterns, cb)
//     }

//     cleaner_task.displayName = `clean:${taskname}`

//     gulp.push({
//       cleanerTask: true,
//       displayName: cleaner_task.displayName,
//       description: `purges "${taskname}" task output`,
//       default: task.clean.default,
//       export: false,
//       function: cleaner_task,
//     })
//   }

//   // populate watchers array
//   if (task.watch) {
//     task.watch.function = series(task.function)

//     // TODO: atm deletes everything but only builds changed files
//     //       when used with src({ since: lastRun(taskname) })
//     // if (task.clean) {
//     //   task.watch.function = series(task.clean.function, task.function)
//     // }

//     watchers.push({
//       patterns: task.watch.patterns,
//       task: task.watch.function,
//     })
//   }
// })
