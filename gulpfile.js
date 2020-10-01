'use strict'

const { src, dest, series, parallel, watch } = require('gulp')

const pump = require('pump')
const del = require('del')
const url = require('url')

const browserSync = require('browser-sync')
const reload = browserSync.reload

const data = require('gulp-data')
const prettier = require('gulp-prettier')
const postcss = require('gulp-postcss')
const pug = require('gulp-pug')
const rename = require('gulp-rename')
const stylelint = require('gulp-stylelint')

function templates(cb) {
  pump(
    [
      src('./src/templates/**/*.pug'),
      data(() => {
        return {
          data: {
            social: require('./src/data/social.json'),
          },
          modules: {
            url,
          },
        }
      }),
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

function fonts(cb) {
  pump(
    [src('./src/fonts/**/*'), dest('./dist/fonts'), reload({ stream: true })],
    cb
  )
}

function styles(cb) {
  pump(
    [
      src('./src/styles/creeation.css'),
      stylelint({
        reporters: [{ formatter: 'string', console: true }],
      }),
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
    notify: false,
    open: false,
    online: false,
    server: {
      baseDir: './dist',
    },
  })
}

function clean() {
  return del(['./dist'])
}

exports.default = exports.build = series(
  clean,
  parallel(templates, images, fonts, styles, scripts),
  serve
)

exports.templates = templates
exports.images = images
exports.fonts = fonts
exports.styles = styles
exports.scripts = scripts
exports.serve = serve

watch('./src/templates/**/*', { queue: true }, series(templates))
watch('./src/images/**/*', { queue: true }, series(images))
watch('./src/fonts/**/*', { queue: true }, series(fonts))
watch('./src/styles/**/*', { queue: true }, series(styles))
watch('./src/scripts/**/*', { queue: true }, series(scripts))
watch(
  './src/data/**/*.json',
  { queue: true },
  series(parallel(templates, images, fonts, styles, scripts))
)
