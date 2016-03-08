gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
coffeelint = require 'gulp-coffeelint'
mocha = require 'gulp-mocha'
qunit = require 'gulp-qunit'

# Coffee script build
gulp.task 'build', ['coffeelint'], ->
  gulp.src './src/*.coffee'
      .pipe coffee({bare: true}).on('error', gutil.log)
      .pipe gulp.dest('./js')


gulp.task 'coffeelint', ->
  gulp.src './src/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()


gulp.task 'buildtest', ['build'], ->
  gulp.src './test/*.coffee'
      .pipe coffee({bare: true}).on('error', gutil.log)
      .pipe gulp.dest('./test')


gulp.task 'test', ['build', 'buildtest'], ->
  gulp.src './test/jqueryheremap.html'
      .pipe qunit()


# Default task
gulp.task 'default', ['coffee',]
