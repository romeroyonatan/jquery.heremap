(($) ->
  module 'jQuery.fn.heremap' 

  test 'is heremap', ->
    expect(2)
    strictEqual($.heremap(), 'heremap', 'should be jquery.heremap')
    strictEqual($.heremap({punctuation: '!'}), 'jquery.heremap!', 'should be thoroughly jquery.heremap')
  
) jQuery
