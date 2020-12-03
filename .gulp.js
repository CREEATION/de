"use strict"

const config = {}

config.project = {
  name: "CREEATION.de",
  options: {
    logging: {
      debug: true,
      verbose: true,
    },
  },
  plugins: [
    {
      name: "browser-sync",
      config: {
        server: "dist",
        port: 6077,
        localOnly: true,
        online: false,
        open: false,
        notify: false,
      },
    },
    {
      name: "gulp-html-i18n",
      config: {
        langDir: "src/lang",
        createLangDirs: true,
        defaultLang: "en",
        fallback: "en",
      },
    },
  ],
}

/**
 * gulp-cli configuration
 * @see https://github.com/gulpjs/gulp-cli#configuration
 */
config.gulp_cli = {
  description: config.project.name,
  flags: {
    continue: true,
    compactTasks: true,
    silent: false,
  },
}

// merge gulp-cli configuration into config root
for (const key in config.gulp_cli) {
  if (config.gulp_cli.hasOwnProperty(key)) {
    config[key] = config.gulp_cli[key]
  }
}
delete config.gulp_cli

module.exports = config
