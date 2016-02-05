'use strict'

const gulp = require('gulp')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const del = require('del')
const nodemon = require('nodemon')
const minimist = require('minimist')
const slm = require('gulp-slm')

const R = require('ramda')

// ARGUMENTS
const args = minimist(process.argv.slice(2), {
  string: 'file',
  default: {file: 'main'}
})
// ARGUMENTS

// SLIM
gulp.task('slim', function() {
  gulp.src('./src/*.slim')
    .pipe(slm({pretty: true}))
    .pipe(gulp.dest('./build/'))
})

gulp.task('slim-watch', ['slim'], function() {
  gulp.watch('./src/*.slim', ['slim'])
})
// SLIM


// WEBPACK CONFIG
const config = {
  entry: './src/main.js',
  target: 'web',
  output: {
    path: path.join(__dirname, 'build'),
    filename: `main.js`
  },
  module: {
    loaders: [
      { loader: 'ng-annotate', test: /\.js$/, exclude: /node_modules/ },
      { loaders: ['html', 'slm'], test: /\.(slm|slim)$/, exclude: /node_modules/ },
      {
        loader: 'babel-loader',
        test: /\.js$/, exclude: /node_modules/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['stage-0', 'es2015']
        }
      }
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['./src', 'node_modules']
  }
}
// WEBPACK CONFIG

gulp.task('clean-build', done => del('./build', done))

gulp.task('build', ['clean-build'], function(done) {
  webpack(config).run(function(err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Compilled')
      done()
    }
  })
})

gulp.task('build-watch', ['build'], function() {
  webpack(config).watch(100, function(err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Recompilled')
      nodemon.restart()
    }
  })
})

gulp.task('run', ['build-watch', 'slim-watch'])
