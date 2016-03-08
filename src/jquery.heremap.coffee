###
# Copyright (c) 2016 Yonatan Romero
# Licensed under the GPLv3 license.
###

(($) ->

  # Default options.
  $.fn.heremap.options =
    app_id: ''
    app_code: ''
    punctuation: '.'
    zoom: 10
    center:
      lng: 0
      lat: 0
  options = {}
  platform = null
  maptypes = null

  ###
  # Initialize plugin
  ###
  init = ->
    # check if H exists in the context
    if not H?
      throw new Error "Don't forget include
                      'http://js.api.here.com/v3/3.0/mapsjs-core.js'"
    # initialize platform
    platform = new H.service.Platform
      app_id: options.app_id
      app_code: options.app_code

    # load map types
    maptypes = platform.createDefaultLayers()


  $.fn.heremap = (options) ->
    # Override default options with passed-in options.
    options = $.extend({}, $.fn.heremap.options, options)
    init()
    
    @.each ->
      elem = $ this
      map = new H.Map elem, maptypes.normal.map,
        zoom: options.zoom
        center: options.center

) jQuery
