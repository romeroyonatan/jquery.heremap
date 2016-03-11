gulp = require 'gulp'
coffee = require 'gulp-coffee'
gutil = require 'gulp-util'
coffeelint = require 'gulp-coffeelint'
uglify = require 'gulp-uglify'
rename = require 'gulp-rename'
qunit = require 'node-qunit-phantomjs'
header = require 'gulp-header'
concat = require 'gulp-concat'

pkg = require './package.json'
banner = """
/**
* <%= pkg.name %> - <%= pkg.description %>
* @version v<%= pkg.version %>
* @link <%= pkg.homepage %>
* @author <%= pkg.author.name %> - <%= pkg.author.url %>
* @license <%= pkg.license %>
*/"""

# Coffee script build
gulp.task 'build', ['coffeelint'], ->
  gulp.src './src/*.coffee'
      # build coffee script
      .pipe concat('jquery.heremap.coffee')
      .pipe coffee().on('error', gutil.log)
      # add banner
      .pipe header banner, pkg : pkg
      # copy js to dist
      .pipe gulp.dest('./dist')
      # compress js
      .pipe uglify(preserveComments: 'license')
      .pipe rename extname: '.min.js'
      # copy minified code to dist folder
      .pipe gulp.dest('./dist')


# check if own code has quality
gulp.task 'coffeelint', ->
  gulp.src './src/*.coffee'
      .pipe coffeelint()
      .pipe coffeelint.reporter()


gulp.task 'test', ['build'], ->
  # build test code
  gulp.src './test/*.coffee'
      .pipe coffee()
      .pipe rename prefix: '.'
      .pipe gulp.dest('./test')
  # run qunit
  qunit('./test/qunit.html')
 

# Default task
gulp.task 'default', ['coffee',]
