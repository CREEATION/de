module.exports = {
  map: false,
  plugins: [
    require('postcss-import')({
      from: './src/styles/creeation.css',
    }),
    require('postcss-preset-env')({
      stage: 0,
    }),
    // require('postcss-combine-media-query'),
    require('autoprefixer'),
  ],
}
