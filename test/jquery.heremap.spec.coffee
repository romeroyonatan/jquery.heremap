chai = require 'chai'
should = chai.should()
chaiAsPromised = require("chai-as-promised")
chai.use(chaiAsPromised);

describe 'jquery.heremap', ->
  describe 'Validating a Here libs imported', ->
    it 'App id should not be null', ->
      $.fn.heremap.options.app_id = 'something'
      $.fn.heremap.options.app_id.should.be.equal 'something'

    it 'Heremap plugin should exists', ->
      $("[role='map']").heremap.should.be.a 'function'
