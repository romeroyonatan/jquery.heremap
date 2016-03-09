gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
coffeelint = require 'gulp-coffeelint'
mocha = require 'gulp-mocha'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'

# Coffee script build
gulp.task 'build', ['coffeelint'], ->
  gulp.src './src/*.coffee'
      .pipe coffee().on('error', gutil.log)
      .pipe gulp.dest('./dist')
      .pipe uglify()
      .pipe rename extname: '.min.js'
      .pipe gulp.dest('./dist')

gulp.task 'coffeelint', ->
  gulp.src './src/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()

gulp.task 'test', ['build'], ->
  gulp.src './test/jquery.coffee'
      .pipe mocha()


# Default task
gulp.task 'default', ['coffee',]
