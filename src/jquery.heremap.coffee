###
# Copyright (c) 2016 Yonatan Romero
# Licensed under the GPLv3 license.
###
$ = window.jQuery or window.Zepto or window.$
$.heremap = {}
$.heremap.fn = {}
$.fn.heremap = (method="init", args...) ->
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


###
# Obtains the center of map by DOM element's attribute "data-center"
###
getCenter = (elem) ->
  str = $(elem).data 'center'
  if str?
    match = /(-?\d+.?\d*),(-?\d+.?\d*)/.exec str
    if match?
      return {
        lat: parseFloat match[1]
        lng: parseFloat match[2]
      }
  $.fn.heremap.options.center


###
# Obtains the zoom of map by DOM element's attribute "data-zoom"
###
getZoom = (elem) ->
  str = $(elem).data 'zoom'
  if str?
    match = /(\d+)/.exec str
    if match?
      return parseInt match[1]
  $.fn.heremap.options.zoom


###
# Obtains a list of markers by DOM element's attribute "data-markers"
###
getMarkers = (elem) ->
  str = $(elem).data 'markers'
  markers = []
  if str?
    regex = /((-?\d+.?\d*),(-?\d+.?\d*))+/g
    markers = while match = regex.exec str
      lat: parseFloat match[2]
      lng: parseFloat match[3]
  markers


###
# Add markers to the map
###
$.heremap.fn.addMarker = (position) ->
  if position?
    @each (i, elem) ->
      map = $(elem).data 'heremap'
      map?.addObject new H.map.Marker position
      if map?.getCenter().lat is 0 and map?.getCenter().lng is 0
        map?.setCenter(position)


###
# Resize canvas
###
$.heremap.fn.resize = () ->
  @each (i, elem) ->
    map = $(elem).data 'heremap'
    map?.getViewPort().resize()



###
# Creates Here Map by using their API
###
createMap = (elem) ->
  # create map
  map = new H.Map elem, maptypes.normal.map,
    zoom: getZoom elem
    center: getCenter elem
  # asociate map with element's data
  $(elem).data heremap: map
  # set markers
  $(elem).heremap 'addMarker', position for position in getMarkers elem
  # show controls
  show_controls = $(elem).data "controls"
  if show_controls? and show_controls
    H.ui.UI.createDefault map, maptypes, $.fn.heremap.options.lang
  # enable interaction
  interact = $(elem).data "interact"
  if interact? and interact
    mapEvents = new H.mapevents.MapEvents map
    behavior = new H.mapevents.Behavior mapEvents


$.heremap.fn.init = (options) ->
  # Override default options with passed-in options.
  options = $.extend({}, $.fn.heremap.options, options)
  if @length > 0
    init options
    @each (i, elem) -> createMap elem


# Default options.
$.fn.heremap.options =
  app_id: ''
  app_code: ''
  zoom: 10
  center:
    lat: 0
    lng: 0
  lang: 'en-US'


# Create maps in document
$(document).on 'ready', ->
  $("[data-heremap]").heremap()
