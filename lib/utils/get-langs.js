"use strict"

module.exports = function get_langs() {
  return require("globby")
    .sync(["src/lang", "!src/lang/**/*.yaml"], {
      onlyFiles: false,
      objectMode: true,
    })
    .map((dir) => dir.name)
}
