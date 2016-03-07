/*
 * 
 * 
 *
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */
(function ($) {
  $.jquery.heremap = function (options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.jquery.heremap.options, options);
    // Return the name of your plugin plus a punctuation character.
    return 'jquery.heremap' + options.punctuation;
  };

  // Default options.
  $.jquery.heremap.options = {
    punctuation: '.'
  };
}(jQuery));
