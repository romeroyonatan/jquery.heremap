
/*
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */

(function() {
  var $, createMap, getCenter, getMarkers, getZoom, init, maptypes, platform, setMarkers;

  $ = window.jQuery || window.Zepto || window.$;

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


  /*
   * Obtains the center of map by DOM element's attribute "data-center"
   */

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


  /*
   * Obtains the zoom of map by DOM element's attribute "data-zoom"
   */

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


  /*
   * Obtains a list of markers by DOM element's attribute "data-markers"
   */

  getMarkers = function(elem) {
    var markers, match, regex, str;
    str = $(elem).attr('data-markers');
    if (str != null) {
      regex = /((-?\d+.?\d*),(-?\d+.?\d*))+/g;
      markers = (function() {
        var results;
        results = [];
        while (match = regex.exec(str)) {
          results.push({
            lat: parseFloat(match[2]),
            lng: parseFloat(match[3])
          });
        }
        return results;
      })();
    }
    return markers;
  };


  /*
   * Set markers in the map
   */

  setMarkers = function(map, markers) {
    var center, coord, j, len, results;
    if (markers != null) {
      results = [];
      for (j = 0, len = markers.length; j < len; j++) {
        coord = markers[j];
        map.addObject(new H.map.Marker(coord));
        center = map.getCenter();
        if (center.lat === 0 && center.lng === 0) {
          results.push(map.setCenter(coord));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }
  };


  /*
   * Creates Here Map by using their API
   */

  createMap = function(elem) {
    var behavior, interact, map, mapEvents, show_controls;
    map = new H.Map(elem, maptypes.normal.map, {
      zoom: getZoom(elem),
      center: getCenter(elem)
    });
    setMarkers(map, getMarkers(elem));
    $(elem).data({
      heremap: map
    });
    show_controls = $(elem).attr("data-controls");
    if ((show_controls != null) && show_controls.toLowerCase() === "true") {
      H.ui.UI.createDefault(map, maptypes, $.fn.heremap.options.lang);
    }
    interact = $(elem).attr("data-interact");
    if ((interact != null) && interact.toLowerCase() === "true") {
      mapEvents = new H.mapevents.MapEvents(map);
      return behavior = new H.mapevents.Behavior(mapEvents);
    }
  };

  $.fn.heremap = function(options) {
    options = $.extend({}, $.fn.heremap.options, options);
    if (this.length > 0) {
      init(options);
      return this.each(function(i, elem) {
        return createMap(elem);
      });
    }
  };

  $.fn.heremap.options = {
    app_id: '',
    app_code: '',
    zoom: 10,
    center: {
      lat: 0,
      lng: 0
    },
    lang: 'en-US'
  };

  $(document).on('ready', function() {
    return $("div[role='map']").heremap();
  });

}).call(this);
