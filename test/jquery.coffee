window = require('jsdom').jsdom().defaultView
global.$ = require('jquery')(window)
global.jQuery = require('jquery')(window)
global.window = window
global.document = window.document

require('../js/jquery.heremap')
require('./jquery.heremap.spec')
