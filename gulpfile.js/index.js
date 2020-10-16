"use strict"

require("browser-sync").create("gulp")

const { require_tasks } = require("./modules")

module.exports = require_tasks([
  "assets/fonts",
  "assets/images",
  "content/templates",
  "styles",
  "build",
  "clean",
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
