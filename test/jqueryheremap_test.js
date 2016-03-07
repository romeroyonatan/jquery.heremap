(function ($) {
  module('jQuery.jquery.heremap');

  test('is jquery.heremap', function () {
    expect(2);
    strictEqual($.jquery.heremap(), 'jquery.heremap.', 'should be jquery.heremap');
    strictEqual($.jquery.heremap({punctuation: '!'}), 'jquery.heremap!', 'should be thoroughly jquery.heremap');
  });
  
}(jQuery));
