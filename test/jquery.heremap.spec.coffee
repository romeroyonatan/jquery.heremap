fixture = $ "#qunit-fixture"

QUnit.test 'Heremap plugin should exists', (assert) ->
  assert.ok $("[data-heremap]").heremap

QUnit.test 'App id and App code should be modificable', (assert) ->
  $.fn.heremap.options.app_id = 'abc'
  $.fn.heremap.options.app_code = 'xyz'
  assert.equal $.fn.heremap.options.app_id, 'abc',
  assert.equal $.fn.heremap.options.app_code, 'xyz',

QUnit.test 'data-center Markup', (assert) ->
  sinon.spy(H, "Map")
  fixture.append "<div data-heremap data-center='-34,-58'></div>"
  $("[data-heremap]").heremap()
  center = H.Map.args[0][2].center
  assert.propEqual center, {lat:-34, lng:-58}
  H.Map.restore()

QUnit.test 'data-zoom Markup', (assert) ->
  sinon.spy(H, "Map")
  fixture.append "<div data-heremap data-zoom='1'></div>"
  $("[data-heremap]").heremap()
  zoom = H.Map.args[0][2].zoom
  assert.equal zoom, 1, "Verify method getZoom()"
  H.Map.restore()

QUnit.test 'data-markers Markup', (assert) ->
  sinon.spy(H.map, "Marker")
  fixture.append "<div data-heremap data-markers='1,1 2,2 3,3'></div>"
  $("[data-heremap]").heremap()
  position1 = H.map.Marker.args[0]
  position2 = H.map.Marker.args[1]
  position3 = H.map.Marker.args[2]
  assert.propEqual position1[0], {lat:1, lng:1}
  assert.propEqual position2[0], {lat:2, lng:2}
  assert.propEqual position3[0], {lat:3, lng:3}
  H.map.Marker.restore()

QUnit.test 'data-controls Markup', (assert) ->
  sinon.spy(H.ui.UI, "createDefault")
  # test default
  fixture.append "<div id='f' data-heremap></div>"
  $("[data-heremap]").heremap()
  assert.notOk H.ui.UI.createDefault.called
  # test true
  fixture.append "<div id='t' data-heremap data-controls='true'></div>"
  $("#t[data-heremap]").heremap()
  assert.ok H.ui.UI.createDefault.called
  H.ui.UI.createDefault.restore()

QUnit.test 'data-interact Markup', (assert) ->
  sinon.spy(H.mapevents, "MapEvents")
  sinon.spy(H.mapevents, "Behavior")
  # test default
  fixture.append "<div id='f' data-heremap></div>"
  $("[data-heremap]").heremap()
  assert.notOk H.mapevents.MapEvents.called
  assert.notOk H.mapevents.Behavior.called
  # test true
  fixture.append "<div id='t' data-heremap data-interact='true'></div>"
  $("#t[data-heremap]").heremap()
  assert.ok H.mapevents.MapEvents.called
  assert.ok H.mapevents.Behavior.called
  H.mapevents.MapEvents.restore()
  H.mapevents.Behavior.restore()

QUnit.test 'addMarker method', (assert) ->
  sinon.spy(H.map, "Marker")
  fixture.append "<div data-heremap></div>"
  $("[data-heremap]").heremap()
  $("[data-heremap]").heremap 'addMarker', {lat:1, lng:1}
  position = H.map.Marker.args[0][0]
  assert.propEqual position, {lat:1, lng:1}
  H.map.Marker.restore()
