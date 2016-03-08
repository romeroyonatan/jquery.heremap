assert = require('assert')

describe 'jquery.heremap', ->
  describe 'Validating a Here libs imported', ->
    it 'should fail if empty', ->
      assert $.fn
      assert $.fn.heremap
