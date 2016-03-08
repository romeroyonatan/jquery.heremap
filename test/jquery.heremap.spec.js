(function($) {
  module('jQuery.fn.heremap');
  return test('is heremap', function() {
    expect(2);
    strictEqual($.heremap(), 'heremap', 'should be jquery.heremap');
    return strictEqual($.heremap({
      punctuation: '!'
    }), 'jquery.heremap!', 'should be thoroughly jquery.heremap');
  });
})(jQuery);
