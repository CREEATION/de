/**
 * @param {object} plugins object containing imagemin plugins + options
 * @returns {array} normalized imagemin plugins array
 */
module.exports = function parse_imagemin_plugins(imagemin, plugins) {
  const imagemin_plugins = []

  for (const plugin in plugins) {
    if (plugins.hasOwnProperty(plugin)) {
      let imagemin_plugin_config = plugins[plugin]

      if (imagemin_plugin_config.plugin_enabled === true) {
        delete imagemin_plugin_config.plugin_enabled

        // svgo has a different plugin config architecture
        if (plugin == "svgo") {
          const svgo_config = imagemin_plugin_config

          // svgo config template
          imagemin_plugin_config = {
            plugins: [
              // { key: value },
            ],
          }

          for (const key in svgo_config) {
            if (svgo_config.hasOwnProperty(key)) {
              let svgo_plugin = {}

              svgo_plugin[key] = svgo_config[key]

              imagemin_plugin_config.plugins.push(svgo_plugin)
            }
          }
        }

        imagemin_plugins.push(imagemin[plugin](imagemin_plugin_config))
      }
    }
  }

  return imagemin_plugins
}
