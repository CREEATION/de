module.exports = {
  plugins: [
    // https://www.npmjs.com/package/postcss-import
    require("postcss-import")(),

    // https://www.npmjs.com/package/postcss-functions
    require("postcss-functions")({
      functions: require("./postcss.functions"),
    }),

    // https://www.npmjs.com/package/postcss-hidden
    require("postcss-hidden")(),

    // https://www.npmjs.com/package/postcss-preset-env
    require("postcss-preset-env")({
      features: {
        "all-property": { reset: "inherited" },
        "custom-properties": true,
      },
      preserve: true,
      stage: 1,
    }),

    // https://www.npmjs.com/package/postcss-calc
    require("postcss-calc")({ warnWhenCannotResolve: true }),

    // https://www.npmjs.com/package/postcss-reporter
    require("postcss-reporter")({
      clearReportedMessages: true,
    }),
  ],
}
