"use strict"

const del = require("del")
const c = require("ansi-colors")
const log = require("fancy-log")

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
    let log_message = c.green("Nothing found to delete")
    let log_patterns = `"${patterns}"`

    const deleted_paths = await del(patterns, options)

    if (deleted_paths.length) {
      log_message = c.red(`Deleted ${deleted_paths.length} files/directories`)
    }

    if (Array.isArray(patterns)) {
      log_patterns = patterns.map((pattern) => `"${pattern}"`).join(", ")
    }

    log.info(
      `${log_message}\n          `,
      c.red(">"),
      c.gray(`Patterns: [${log_patterns}]`)
    )

    resolve()
  })
}
