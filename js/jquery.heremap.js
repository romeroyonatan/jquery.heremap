
/*
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */
(function($) {
  var getCenter, getZoom, init, maptypes, platform;
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
      app_id: $.fn.heremap.options.app_id,
      app_code: $.fn.heremap.options.app_code
    });
    return maptypes = platform.createDefaultLayers();
  };
  getCenter = function(elem) {
    var match, str;
    str = $(elem).attr('data-center');
    if (str != null) {
      match = /(-?\d+.?\d*),(-?\d+.?\d*)/.exec(str);
      if (match != null) {
        return {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2])
        };
      }
    }
    return $.fn.heremap.options.center;
  };
  getZoom = function(elem) {
    var match, str;
    str = $(elem).attr('data-zoom');
    if (str != null) {
      match = /(\d+)/.exec(str);
      if (match != null) {
        return parseInt(match[1]);
      }
    }
    return $.fn.heremap.options.zoom;
  };
  $.fn.heremap = function(options) {
    options = $.extend({}, $.fn.heremap.options, options);
    init(options);
    return this.each(function() {
      return new H.Map(this, maptypes.normal.map, {
        zoom: getZoom(this),
        center: getCenter(this)
      });
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
