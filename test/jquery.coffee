fs = require('fs')

html = fs.readFileSync 'test/jquery.heremap.html', 'utf8'
window = require('jsdom').jsdom(html).defaultView
global.$ = require('jquery')(window)
global.window = window
global.document = window.document

require('../dist/jquery.heremap')
require('./jquery.heremap.spec')
