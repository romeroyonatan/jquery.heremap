gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
coffeelint = require 'gulp-coffeelint'
mocha = require 'gulp-mocha'
qunit = require 'gulp-qunit'
uglify = require 'gulp-uglify'

# Coffee script build
gulp.task 'build', ['coffeelint'], ->
  gulp.src './src/*.coffee'
      .pipe coffee({bare: true}).on('error', gutil.log)
      .pipe gulp.dest('./js')


gulp.task 'coffeelint', ->
  gulp.src './src/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()

gulp.task 'test', ['build'], ->
  gulp.src './test/jquery.coffee'
      .pipe mocha()


# Default task
gulp.task 'default', ['coffee',]
