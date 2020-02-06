module.exports = {
  map: false,
  plugins: {
    'postcss-import': {
      from: './src/styles/creeation.css',
    },
    'postcss-preset-env': {} || null,
    'autoprefixer': {
      cascade: false,
    },
  },
}
