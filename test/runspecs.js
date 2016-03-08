var jQuery, window;

window = require("jsdom").jsdom().defaultView;

jQuery = require("jquery");

require("expectThat.mocha");

require("../js/jquery.heremap");

require("./jquery.heremap.spec");
