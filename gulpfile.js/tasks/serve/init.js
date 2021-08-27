"use strict"

const {
  task_finalize,
  utils_browser_sync_instance,
  utils_log,
  utils_config,
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

    utils_browser_sync_instance().init(
      utils_config("browser-sync").config,
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
            text: utils_browser_sync_instance("name"),
            color: "green",
          },
          {
            text: `'`,
          },
          {
            text: ` (local: `,
            color: "gray",
          },
          {
            text: !bs.getOption("online"),
            color: "magenta",
          },
          {
            text: `)`,
            color: "gray",
          },
        )

        utils_log(
          {
            text: `~ `,
            color: "cyan",
          },
          {
            text: `Watchers: `,
            color: "gray",
          },
          {
            text: tasksNames,
            color: "magenta",
            sep: {
              color: "gray",
              text: ", ",
            },
          },
        )
      },
    )
  },
  {
    metadata: {
      displayName: "serve:init",
      description: "initializes a browsersync instance & all tasks watchers",
      flags: undefined,
    },
  },
)
