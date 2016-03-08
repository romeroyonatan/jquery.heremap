
/*
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */
(function($) {
  var init, maptypes, options, platform;
  $.fn.heremap.options = {
    app_id: '',
    app_code: '',
    punctuation: '.',
    zoom: 10,
    center: {
      lng: 0,
      lat: 0
    }
  };
  options = {};
  platform = null;
  maptypes = null;

  /*
   * Initialize plugin
   */
  init = function() {
    if (typeof H === "undefined" || H === null) {
      throw new Error("Don't forget include 'http://js.api.here.com/v3/3.0/mapsjs-core.js'");
    }
    platform = new H.service.Platform({
      app_id: options.app_id,
      app_code: options.app_code
    });
    return maptypes = platform.createDefaultLayers();
  };
  return $.fn.heremap = function(options) {
    options = $.extend({}, $.fn.heremap.options, options);
    init();
    return this.each(function() {
      var elem, map;
      elem = $(this);
      return map = new H.Map(elem, maptypes.normal.map, {
        zoom: options.zoom,
        center: options.center
      });
    });
  };
})(jQuery);
