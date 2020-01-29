'use strict'

const { src, dest, series, parallel, watch } = require('gulp')

const pump = require('pump')
const del = require('del')
const browserSync = require('browser-sync')
const reload = browserSync.reload

const prettier = require('gulp-prettier')
const postcss = require('gulp-postcss')
const pug = require('gulp-pug')
const rename = require('gulp-rename')

function templates(cb) {
  pump(
    [
      src('./src/templates/**/*.pug'),
      pug(),
      prettier(),
      dest('./dist'),
      reload({ stream: true }),
    ],
    cb
  )
}

function images(cb) {
  pump(
    [src('./src/images/**/*'), dest('./dist/img'), reload({ stream: true })],
    cb
  )
}

function styles(cb) {
  pump(
    [
      src('./src/styles/**/*.sss'),
      postcss(),
      rename({ extname: '.css' }),
      prettier(),
      dest('./dist/css'),
      reload({ stream: true }),
    ],
    cb
  )
}

function scripts(cb) {
  pump(
    [
      src('./src/scripts/**/*.js'),
      prettier(),
      dest('./dist/js'),
      reload({ stream: true }),
    ],
    cb
  )
}

function serve(cb) {
  browserSync({
    server: {
      baseDir: './dist',
    },
  })
}

function clean() {
  return del(['./dist'])
}

exports.default = series(
  clean,
  parallel(templates, images, styles, scripts),
  serve
)
exports.build = exports.default

exports.templates = templates
exports.images = images
exports.styles = styles
exports.scripts = scripts
exports.serve = series(exports.build, serve)

watch('./src/templates/**/*', (cb) => {
  exports.templates()
  cb()
})

watch('./src/images/**/*', (cb) => {
  exports.images()
  cb()
})

watch('./src/styles/**/*', (cb) => {
  exports.styles()
  cb()
})

watch('./src/scripts/**/*', (cb) => {
  exports.scripts()
  cb()
})
