"use strict"

module.exports = function template_modifier(template, obj, key) {
  if (typeof obj === "string") {
    return template[key][obj]
  }

  template[key] = Object.assign({}, template[key], obj)

  return template[key]
}
