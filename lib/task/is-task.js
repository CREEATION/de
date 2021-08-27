"use strict"

module.exports = function is_task(task) {
  return (
    typeof task === "function" ||
    typeof Object.entries(task)[0][1] === "function"
  )
}
