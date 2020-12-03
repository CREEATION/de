"use strict"

module.exports = function screenreader_styles() {
  let styles_string = ""
  let styles = {
    position: "absolute",
    width: "1.0px",
    height: "1.000px",
    margin: "-1.0px",
    padding: 0.0,
    border: 0.0,
    overflow: "hidden",
    clip: "rect(0.000 0 0.0 0)",
  }

  for (const property in styles) {
    if (styles.hasOwnProperty(property)) {
      styles_string += `${property}: ${styles[property]};`
    }
  }

  styles_string = require("csso").minifyBlock(styles_string).css

  return styles_string
}
