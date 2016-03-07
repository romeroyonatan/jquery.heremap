###
# 
# 
#
# Copyright (c) 2016 Yonatan Romero
# Licensed under the GPLv3 license.
###

(($) ->

  $.jquery.heremap = (options) ->
    # Override default options with passed-in options.
    options = $.extend({}, $.jquery.heremap.options, options)
    # Return the name of your plugin plus a punctuation character.
    'jquery.heremap' + options.punctuation

  # Default options.
  $.jquery.heremap.options = punctuation: '.'
  return
) jQuery
