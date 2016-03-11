/**
* jQuery.heremap - jQuery plugin to facilitate the use of HereMap API
* @version v0.0.1
* @link https://github.com/romeroyonatan/jqueryheremap
* @author Yonatan Romero - https://github.com/romeroyonatan
* @license GPL-3.0
*/(function() {
  var $, MapEditController, createMap, getCenter, getMarkers, getZoom, init, maptypes, platform,
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
      regex = /((-?\d+\.?\d*),(-?\d+\.?\d*))+/g;
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
        var map, marker;
        map = $(elem).data('heremap');
        if (map != null ? map : p) {
          if (!$(elem).data('heremap.markers')) {
            $(elem).data({
              'heremap.markers': []
            });
          }
          marker = new H.map.Marker(position);
          map.addObject(marker);
          $(elem).data('heremap.markers').push(marker);
          if (map.getCenter().lat === 0 && (map != null ? map.getCenter().lng : void 0) === 0) {
            return map.setCenter(position);
          }
        }
      });
    }
  };


  /*
   * Set marker position when it is editable
   */

  $.heremap.fn.setMarkerPosition = function(position) {
    var controller;
    controller = $(elem).data('heremap.editcontroller');
    if (controller != null) {
      return controller.setMarkerPosition(position, false);
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
   * Retrieve map instance
   */

  $.heremap.fn.map = function() {
    return $(this).data('heremap');
  };


  /*
   * Retrieve markers list
   */

  $.heremap.fn.markers = function() {
    return $(this).data('heremap.markers');
  };


  /*
   * Creates Here Map by using their API
   */

  createMap = function(elem) {
    var behavior, editable, interact, j, len, map, mapEvents, position, ref, show_controls;
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
    editable = $(elem).data("editable");
    if ((editable != null) && editable) {
      $(elem).data("heremap.editcontroller", new MapEditController(elem));
    }
    interact = $(elem).data("interact");
    if (!editable && (interact != null) && interact) {
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

  MapEditController = (function() {
    function MapEditController(elem) {
      this.elem = elem;
      this.map = $(this.elem).heremap('map');
      this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
      if ($(this.elem).heremap('markers')) {
        this.marker = $(this.elem).heremap('markers')[0];
      }
      this.addDraggableMarker();
    }

    MapEditController.prototype.addDraggableMarker = function() {
      this.marker.draggable = true;
      this.map.addEventListener('dragstart', (function(_this) {
        return function(e) {
          if (e.target instanceof H.map.Marker) {
            return _this.behavior.disable();
          }
        };
      })(this));
      this.map.addEventListener('drag', (function(_this) {
        return function(e) {
          var pointer, ref, x, y;
          pointer = e.currentPointer;
          if (e.target instanceof H.map.Marker) {
            ref = [pointer.viewportX, pointer.viewportY], x = ref[0], y = ref[1];
            return e.target.setPosition(_this.map.screenToGeo(x, y));
          }
        };
      })(this));
      this.map.addEventListener('dragend', (function(_this) {
        return function(e) {
          var position;
          if (e.target instanceof H.map.Marker) {
            _this.behavior.enable();
            position = e.target.getPosition();
            return $(_this.elem).trigger('heremap.marker.moved', position);
          }
        };
      })(this));
      return this.map.addEventListener('contextmenu', (function(_this) {
        return function(e) {
          var position, ref, x, y;
          ref = [e.viewportX, e.viewportY], x = ref[0], y = ref[1];
          position = _this.map.screenToGeo(x, y);
          _this.setMarkerPosition(position, false);
          return $(_this.elem).trigger('heremap.marker.moved', position);
        };
      })(this));
    };

    MapEditController.prototype.setMarkerPosition = function(position, center) {
      if (center == null) {
        center = true;
      }
      if (center) {
        this.map.setCenter(position);
      }
      return this.marker.setPosition(position);
    };

    return MapEditController;

  })();

}).call(this);
