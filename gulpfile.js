'use strict'

const gulp = require('gulp')
const webpack = require('webpack')
const path = require('path')
const del = require('del')
const nodemon = require('nodemon')
const slm = require('gulp-slm')
const karma = require('karma')

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
  entry: {main: './src/main.js', test: './test/main_test.js'},
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
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

gulp.task('build', function(done) {
  webpack(config).run(function(err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Compilled')
      done()
    }
  })
})

gulp.task('run', ['build', 'slim-watch'], function() {
  webpack(config).watch(100, function(err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Recompilled')
      nodemon.restart()
    }
  })
})

gulp.task('test', ['build'], function(done) {
  webpack(config).watch(100, function(err) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Recompilled')
    }
  })
  new karma.Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start()
})

