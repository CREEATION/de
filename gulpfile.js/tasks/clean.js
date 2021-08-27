"use strict"

const { task_finalize, utils_log } = require(`${process.cwd()}/lib`)
const { gray, yellow } = require("ansi-colors")

module.exports = task_finalize(
  (cb) => {
    utils_log(
      {
        text: "> ",
        color: "cyan",
      },
      {
        text: `This is just a sample task. Replace "`,
        color: "magenta",
      },
      {
        text: "taskname",
        color: "yellow",
      },
      {
        text: `" with an actual taskname.`,
        color: "magenta",
        newline: true,
      },
      {
        newline: true,
      },
      {
        text: `Example: `,
        color: "magenta",
      },
      {
        text: `$ `,
        color: "gray",
      },
      {
        text: `gulp `,
        color: "reset",
      },
      {
        text: `clean:`,
        color: "reset",
      },
      {
        text: `templates:localize`,
        color: "yellow",
      },
      {
        newline: true,
      },
    )

    cb()
  },
  {
    metadata: {
      displayName: `clean:taskname`,
      description: gray(`purges "${yellow.italic("taskname")}" task output`),
    },
  },
)
