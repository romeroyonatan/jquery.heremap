###
# Copyright (c) 2016 Yonatan Romero
# Licensed under the GPLv3 license.
###


$ = window.jQuery or window.Zepto or window.$
$.heremap = {}
$.heremap.fn = {}
$.fn.heremap = (method, args...) ->
  $.heremap.fn[method].apply(this, args)

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
    app_id: $.fn.heremap.options.app_id
    app_code: $.fn.heremap.options.app_code

  # load map types
  maptypes = platform.createDefaultLayers()

getCenter = (elem) ->
  str = $(elem).attr('data-center')
  if str?
    match = /(-?\d+.?\d*),(-?\d+.?\d*)/.exec str
    if match?
      return {
        lat: parseFloat match[1]
        lng: parseFloat match[2]
      }
  $.fn.heremap.options.center


getZoom = (elem) ->
  str = $(elem).attr('data-zoom')
  if str?
    match = /(\d+)/.exec str
    if match?
      return parseInt match[1]
  $.fn.heremap.options.zoom


$.fn.heremap = (options) ->
  # Override default options with passed-in options.
  options = $.extend({}, $.fn.heremap.options, options)
  init options
  @.each (i, elem)->
    $(elem).data 'here_map',
            new H.Map elem, maptypes.normal.map,
              zoom: getZoom @
              center: getCenter @


# Default options.
$.fn.heremap.options =
  app_id: ''
  app_code: ''
  zoom: 10
  center:
    lat: -34.6059
    lng: -58.3778

$(document).on 'ready', ->
  $("div[role='map']").heremap()
