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
    let log_message = { color: "green", text: "Nothing found to delete" }
    let log_patterns = `"${patterns}"`

    const deleted_paths = await del(patterns, options)

    if (deleted_paths.length) {
      log_message.color = "red"
      log_message.text = `Deleted ${deleted_paths.length} files/directories`
    }

    if (Array.isArray(patterns)) {
      log_patterns = patterns.map((pattern) => `"${pattern}"`).join(", ")
    }

    log(
      log_message,
      { color: log_message.color, text: ">" },
      { color: "gray", text: `Patterns: [${log_patterns}]` }
    )

    resolve()
  })
}
