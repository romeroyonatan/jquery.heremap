
/*
 * Copyright (c) 2016 Yonatan Romero
 * Licensed under the GPLv3 license.
 */

(function() {
  var $, createMap, getCenter, getMarkers, getZoom, init, maptypes, platform,
    slice = [].slice;

  $ = window.jQuery || window.Zepto || window.$;

  $.heremap = {};

  $.heremap.fn = {};

  $.fn.heremap = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (method == null) {
      method = "init";
    }
    return $.heremap.fn[method].apply(this, args);
  };

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
    str = $(elem).data('center');
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
    str = $(elem).data('zoom');
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
    str = $(elem).data('markers');
    markers = [];
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
   * Add markers to the map
   */

  $.heremap.fn.addMarker = function(position) {
    if (position != null) {
      return this.each(function(i, elem) {
        var map;
        map = $(elem).data('heremap');
        if (map != null) {
          map.addObject(new H.map.Marker(position));
        }
        if ((map != null ? map.getCenter().lat : void 0) === 0 && (map != null ? map.getCenter().lng : void 0) === 0) {
          return map != null ? map.setCenter(position) : void 0;
        }
      });
    }
  };


  /*
   * Resize canvas
   */

  $.heremap.fn.resize = function() {
    return this.each(function(i, elem) {
      var map;
      map = $(elem).data('heremap');
      return map != null ? map.getViewPort().resize() : void 0;
    });
  };


  /*
   * Creates Here Map by using their API
   */

  createMap = function(elem) {
    var behavior, interact, j, len, map, mapEvents, position, ref, show_controls;
    map = new H.Map(elem, maptypes.normal.map, {
      zoom: getZoom(elem),
      center: getCenter(elem)
    });
    $(elem).data({
      heremap: map
    });
    ref = getMarkers(elem);
    for (j = 0, len = ref.length; j < len; j++) {
      position = ref[j];
      $(elem).heremap('addMarker', position);
    }
    show_controls = $(elem).data("controls");
    if ((show_controls != null) && show_controls) {
      H.ui.UI.createDefault(map, maptypes, $.fn.heremap.options.lang);
    }
    interact = $(elem).data("interact");
    if ((interact != null) && interact) {
      mapEvents = new H.mapevents.MapEvents(map);
      return behavior = new H.mapevents.Behavior(mapEvents);
    }
  };

  $.heremap.fn.init = function(options) {
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
    return $("[data-heremap]").heremap();
  });

}).call(this);
