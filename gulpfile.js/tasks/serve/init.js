"use strict"

const {
  task_finalize,
  utils_browser_sync_instance,
  utils_log,
  utils_root_dir,
} = require(`${process.cwd()}/lib`)

module.exports = task_finalize(
  () => {
    const tasksNames = []
    const tasksPaths = [
      "../assets/images",
      "../scripts",
      "../styles",
      "../templates",
    ]

    for (let i = 0; i < tasksPaths.length; i++) {
      require(tasksPaths[i]).watch()

      tasksNames.push(require("path").basename(tasksPaths[i]))
    }

    const browsersync_instance_name = utils_browser_sync_instance()

    require("browser-sync")
      .get(browsersync_instance_name)
      .init(
        require(utils_root_dir("/.gulp.json")).dev["browser-sync"],
        (err, bs) => {
          if (err) throw err

          utils_log(
            {
              text: "> ",
              color: "cyan",
            },
            {
              text: `Started Browsersync instance '`,
            },
            {
              text: browsersync_instance_name,
              color: "green",
            },
            {
              text: `'`,
            },
            {
              text: ` (${bs.getOption("online") ? "online" : "offline"})`,
              color: "cyan",
              newline: true,
            },
            {
              text: `Watchers: `,
              color: "yellow",
            },
            {
              text: tasksNames,
              color: "red",
              sep: {
                color: "cyan",
                text: " | ",
              },
            }
          )
        }
      )
  },
  {
    metadata: {
      displayName: "serve:init",
      description: "initializes a browsersync instance & all tasks watchers",
      flags: undefined,
    },
  }
)
