"use strict"

const del = require("del")
const log = require("./log")

/**
 * Delete files and directories using glob patterns.
 *
 * Logs deleted files/directories to the terminal and runs a callback if provided.
 *
 * @see {@link https://npmjs.com/package/del|del} for docs and options
 *
 * @param {string | readonly string[]} patterns glob patterns
 * @param {Object} options globby/del options
 * @param {Function} cb
 */
module.exports = async function del_cb(patterns = "", options = { dot: true }) {
  return new Promise(async (resolve) => {
    const deleted_paths = await del(patterns, options)
    const log_patterns = Array.isArray(patterns)
      ? patterns.map((pattern) => `"${pattern}"`).join(", ")
      : `"${patterns}"`

    if (deleted_paths.length) {
      log(
        { color: "cyan", text: "> " },
        { color: "red", text: "Deleted " },
        {
          text: deleted_paths.length,
          color: "magenta",
        },
        { color: "red", text: " files/directories", newline: true },
        { color: "red", text: "> " },
        { color: "gray", text: `Patterns: [${log_patterns}]` }
      )
    } else {
      log(
        { color: "cyan", text: "> " },
        { color: "green", text: "Nothing found to delete", newline: true },
        { color: "green", text: "> " },
        { color: "gray", text: `Patterns: [${log_patterns}]` }
      )
    }

    resolve()
  })
}
