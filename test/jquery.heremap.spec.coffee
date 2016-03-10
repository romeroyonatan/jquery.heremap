QUnit.test 'App id should be modificable', (assert) ->
  $.fn.heremap.options.app_id = 'something'
  assert.equal $.fn.heremap.options.app_id, 'something',

QUnit.test 'Heremap plugin should exists', (assert) ->
  assert.ok $("[data-heremap]").heremap
