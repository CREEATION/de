"use strict"

const { tasks_require } = require("../lib")

module.exports = tasks_require([
  "assets/fonts",
  "assets/images",
  "templates",
  "styles",
  "scripts",
  "build",
  "default",
  "serve",
])

// dev configs
// TODO: somehow add development configs
// > use "yargs"?
// > only use build configs on build task?
// > reverse configs? (put dev configs into package.json)
// > use flvy.config(key, merge_options)?:
// console.log(
//   flvy.config("csso", {
//     testi: true,
//     mau: "mau",
//     restructure: "YES BABY",
//   })
// )
