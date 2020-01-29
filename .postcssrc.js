module.exports = {
  parser: 'sugarss',
  map: false,
  plugins: {
    'postcss-import': {} || null,
    'postcss-mixins': {
      mixinsDir: './src/styles/mixins',
      mixins: {},
    },
    'postcss-extend-rule': {} || null,
    'postcss-advanced-variables': {} || null,
    'postcss-preset-env': {} || null,
    'postcss-atroot': {} || null,
    'postcss-property-lookup': {
      logLevel: 'error',
    },
    'postcss-nested': {} || null,
    'postcss-nested-props': {} || null,
    'postcss-functions': {
      functions: {
        rem: function(scale = 1, remBase = '16px', remBaseMultiplier = 1) {
          remBase = parseFloat(remBase)

          var adjustedScale = scale * remBaseMultiplier
          var remFontSize = remBase * scale

          // burn subpixels
          var intFontSize = Math.round(remFontSize)

          // adjust scale value if font-size has subpixels
          if (remFontSize % intFontSize != 0) {
            adjustedScale = intFontSize / remBase
          }

          return adjustedScale + 'rem'
        },
        round: function(value) {
          return Math.round(value)
        },
      },
    },
    'postcss-normalize': {
      forceImport: true,
    },
    'autoprefixer': {
      cascade: false,
    },
  },
}
