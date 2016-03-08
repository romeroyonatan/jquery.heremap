
/*
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */
(function($) {
  var getCenter, init, maptypes, options, platform;
  options = {};
  platform = null;
  maptypes = null;

  /*
   * Initialize plugin
   */
  init = function(options) {
    if (typeof H === "undefined" || H === null) {
      throw new Error("Don't forget include 'http://js.api.here.com/v3/3.0/mapsjs-core.js'");
    }
    platform = new H.service.Platform({
      app_id: options.app_id,
      app_code: options.app_code
    });
    return maptypes = platform.createDefaultLayers();
  };
  getCenter = function(elem, options) {
    var match, pattern, str;
    str = $(elem).attr('data-center');
    if (str != null) {
      pattern = /(-?\d+.?\d*),(-?\d+.?\d*)/;
      match = pattern.exec(str);
      return {
        lat: parseFloat(match[1]),
        lng: parseFloat(match[2])
      };
    }
    return options.center;
  };
  $.fn.heremap = function(options) {
    options = $.extend({}, $.fn.heremap.options, options);
    init(options);
    return this.each(function() {
      var cfg;
      cfg = {
        zoom: options.zoom,
        center: getCenter(this, options)
      };
      console.log(cfg.center);
      return new H.Map(this, maptypes.normal.map, cfg);
    });
  };
  return $.fn.heremap.options = {
    app_id: '',
    app_code: '',
    zoom: 10,
    center: {
      lat: -34.6059,
      lng: -58.3778
    }
  };
})(jQuery);

jQuery(document).on('ready', function() {
  return $("div[role='map']").heremap();
});
