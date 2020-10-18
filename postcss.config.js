module.exports = {
  plugins: [
    // https://www.npmjs.com/package/postcss-import
    require("postcss-import")(),

    // https://www.npmjs.com/package/postcss-preset-env
    require("postcss-preset-env")({
      stage: 1,
      features: {
        "all-property": { reset: "inherited" },
        "custom-properties": { preserve: false },
      },
    }),

    // https://www.npmjs.com/package/postcss-functions
    require("postcss-functions")({
      functions: require("./src/styles/functions"),
    }),

    // https://www.npmjs.com/package/postcss-hidden
    require("postcss-hidden")(),

    // https://www.npmjs.com/package/postcss-calc
    require("postcss-calc")({ warnWhenCannotResolve: true }),

    // https://www.npmjs.com/package/postcss-reporter
    require("postcss-reporter")({
      clearReportedMessages: true,
    }),
  ],
}
