"use strict"

const require_folder = require("require-folder")
const flat = require("flat")

const modules = {}
const modules_path = __dirname

const folders = ["task", "tasks", "utils"]

folders.forEach((folder) => {
  modules[folder] = require_folder(`${modules_path}/${folder}`, {
    normalizeKeys: true,
  })
})

module.exports = flat(modules, { delimiter: "_" })
