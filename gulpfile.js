'use strict'

const { src, dest, series, parallel, watch } = require('gulp')

const pump = require('pump')
const del = require('del')
const fs = require('fs')
const path = require('path')
const url = require('url')
const axios = require('axios')
const jimp = require('jimp')

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

const getFavicons = async (websites, destDir) => {
  // create temp favicons folder for later processing
  const tempFaviconDir = path.normalize(
    [__dirname, destDir, '.temp'].join(path.sep)
  )

  fs.mkdirSync(tempFaviconDir, { recursive: true }, (err) => {
    if (err) throw err
  })

  const favicons = Promise.all(
    websites.map(async (website) => {
      const faviconFilename = url.parse(website.url).hostname + '.png'

      const tempFaviconFilepath = path.normalize(
        [tempFaviconDir, faviconFilename].join(path.sep)
      )

      const faviconFilepath = path.normalize(
        [destDir, faviconFilename].join(path.sep)
      )

      let faviconUrl = ''

      // use custom favicon if set
      if (website.hasOwnProperty('faviconUrl')) {
        faviconUrl = website.faviconUrl
      }

      if (!website.hasOwnProperty('emojicon')) {
        // const faviconSize = 16
        // const faviconResizeMode = jimp.RESIZE_NEAREST_NEIGHBOR

        faviconUrl =
          'https://www.google.com/s2/favicons?domain=' +
          url.parse(website.url).hostname

        // download favicon
        await axios({
          url: faviconUrl,
          responseType: 'stream',
        })
          .then((response) =>
            new Promise((resolve, reject) => {
              response.data
                .pipe(fs.createWriteStream(faviconFilepath))
                .on('finish', async () => {
                  /* @TODO proper favicon resizing stuff, without google s2 */
                  // await jimp
                  //   .read(tempFaviconFilepath)
                  //   .then((image) => {
                  //     return (
                  //       image
                  //         // .autocrop()
                  //         // .contain(faviconSize, faviconSize)
                  //         .resize(faviconSize, faviconSize, faviconResizeMode)
                  //         .write(faviconFilepath)
                  //     )
                  //   })
                  //   .catch((e) => {
                  //     console.warn(
                  //       `Warning: Something's busted. Copying image file "${faviconFilename}" without resizing to ${faviconSize}px²`
                  //     )
                  //     fs.copyFileSync(tempFaviconFilepath, faviconFilepath)
                  //   })

                  resolve()
                })
                .on('error', (e) => reject(e))
            }).catch(console.error)
          )
          .catch(console.error)
      }
    })
  ).catch(console.error)

  // remove temp favicons folder
  favicons
    .then(() => {
      del([tempFaviconDir])
    })
    .catch(console.error)

  return favicons
}

async function images(cb) {
  const faviconsDestDir = './dist/img/favicons'
  const data = [require('./src/data/social.json')]

  // remove existing favicons folder
  await del([faviconsDestDir])

  // create favicons folder
  if (data.length > 0) {
    fs.mkdir(faviconsDestDir, { recursive: true }, (err) => {
      if (err) throw err
    })
  }

  for (const websites of data) {
    await getFavicons(websites, faviconsDestDir)
  }

  pump(
    [src('./src/images/**/*'), dest('./dist/img'), reload({ stream: true })],
    cb
  )
}

function styles(cb) {
  pump(
    [
      src('./src/styles/**/*.css'),
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

watch('./src/data/**/*.json', (cb) => {
  exports.templates()
  exports.images()
  exports.styles()
  exports.scripts()
  cb()
})

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
