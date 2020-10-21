"use strict"

function template_modifier(template, obj, key) {
  if (typeof obj === "string") {
    return template[key][obj]
  }

  template[key] = Object.assign({}, template[key], obj)

  return template[key]
}

function template_data(template, obj) {
  return template_modifier(template, obj, "data")
}

function template_options(template, obj) {
  return template_modifier(template, obj, "options")
}

module.exports = {
  data: template_data,
  options: template_options,
}
