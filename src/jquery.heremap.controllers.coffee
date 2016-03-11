# Editable controller
class MapEditController
  constructor: (elem) ->
    @elem = elem
    @map = $(@elem).heremap 'map'
    @behavior = new H.mapevents.Behavior new H.mapevents.MapEvents @map
    @marker = $(@elem).heremap('markers')[0]
    @addDraggableMarker()
  
  addDraggableMarker: () ->
    @map.addEventListener 'dragstart', (e) =>
      if e.target instanceof H.map.Marker
        @behavior.disable()
  
    @map.addEventListener 'drag', (e) =>
      pointer = e.currentPointer
      if e.target instanceof H.map.Marker
        [x, y] = [pointer.viewportX, pointer.viewportY]
        e.target.setPosition @map.screenToGeo x, y
  
    @map.addEventListener 'dragend', (e) =>
      if e.target instanceof H.map.Marker
        @behavior.enable()
        position = e.target.getPosition()
        # triggers event
        $(@elem).trigger 'heremap.marker.moved', position

    @map.addEventListener 'contextmenu', (e) =>
      [x, y] = [e.viewportX, e.viewportY]
      position = @map.screenToGeo x, y
      @setMarkerPosition position, false
      # triggers event
      $(@elem).trigger 'heremap.marker.moved', position

  setMarkerPosition: (position, center=true) ->
    if center
      @map.setCenter position
    @marker.setPosition position
