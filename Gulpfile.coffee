gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
coffeelint = require 'gulp-coffeelint'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
qunit = require 'node-qunit-phantomjs'
header = require 'gulp-header'

pkg = require './package.json'
banner = """
/**
* <%= pkg.name %> - <%= pkg.description %>
* @version v<%= pkg.version %>
* @link <%= pkg.homepage %>
* @author <%= pkg.author.name %> - <%= pkg.author.email %>
* @license <%= pkg.license %>
*/"""

# Coffee script build
gulp.task 'build', ['coffeelint'], ->
  gulp.src './src/*.coffee'
      .pipe coffee().on('error', gutil.log)
      .pipe(header(banner, { pkg : pkg } ))
      .pipe gulp.dest('./dist')
      .pipe uglify(preserveComments: 'license')
      .pipe rename extname: '.min.js'
      .pipe gulp.dest('./dist')


gulp.task 'coffeelint', ->
  gulp.src './src/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()


gulp.task 'test', ['build'], ->
  qunit('./test/qunit.html')

 

# Default task
gulp.task 'default', ['coffee',]
