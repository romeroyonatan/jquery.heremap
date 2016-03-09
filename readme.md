# jQuery.heremap

> jQuery Plugin to use [Here Map][Here] API

A general purpose library for show maps
For example, you can create a map that shows Berlin

```html
  <div role="map" data-center="52.5,13.4"></div>
```


## Getting Started

Download the [production version][production] or the [development version][development].

[development]: https://github.com/romeroyonatan/jquery.heremap/raw/master/dist/jquery.heremap.js
[production]: https://github.com/romeroyonatan/jquery.heremap/raw/master/dist/jquery.heremap.min.js

In your web page:

```html
<head>
  <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  <link rel="stylesheet" type="text/css" href="//js.api.here.com/v3/3.0/mapsjs-ui.css" />
</head>
<body>
  <!-- Berlin Map-->
  <div role="map" data-center="52.5,13.4"></div>

  <!-- Dependencies -->
  <script src="//js.api.here.com/v3/3.0/mapsjs-core.js" type="text/javascript" charset="utf-8"></script>
  <script src="//js.api.here.com/v3/3.0/mapsjs-service.js" type="text/javascript" charset="utf-8"></script>
  <script src="//js.api.here.com/v3/3.0/mapsjs-ui.js" type="text/javascript" charset="utf-8"></script>
  <script src="//js.api.here.com/v3/3.0/mapsjs-mapevents.js" type="text/javascript" charset="utf-8"></script>
  <script src="//code.jquery.com/jquery-2.2.1.min.js"></script>

  <!-- Jquery HereMap -->
  <script src="jquery.heremap.js" type="text/javascript" charset="utf-8"></script>
  <!-- API Settings -->
  <script>
    $.fn.heremap.options.app_id = 'YOUR API ID';
    $.fn.heremap.options.app_code = 'YOUR APP CODE';
    $.fn.heremap.options.lang = 'es-ES';
  </script>
</body>
```

## Usage

You need a **div** element with atribute **role="map"**. All others atributes are
optionals

```html
<div role="map"
     data-zoom="15"
     data-center="-34.6059,-58.3778"
     data-markers="-34.6059,-58.3778
                   -34.6100,-58.3770
                   -34.6060,-58.3770"
     data-controls="true"
     data-interact="true"
    ></div>
```

Attribute|Default|Description|Example
---------|-------|-----------|--------
data-center|0,0|Coordinates which centers the map. If it is not set and you set a marker, the  first marker's coordinates became the center of the map|"-34.6060,-56.7770"
data-markers|-|Coordinates of markers in the map separated by spaces|"-34.6100,-58.3770 -35,-57"
data-zoom|10|Zoom level of map|"15"
data-controls|False|Show controls buttons to users can interact with the map|"true"
data-interact|False|Let's user interact with the map with their mouse|"true"

## Options

### $.fn.heremap.options.app_id (Obligatory)
Your App ID. You can get your credentials [here][credentials]
### $.fn.heremap.options.app_code (Obligatory)
Your App Code. You can get your credentials [here][credentials]
### $.fn.heremap.options.lang (Optional)
Your language for localization. You can visit the [localization list][languages]. Default "en-US"


## TODO
1. Tests
2. Resize map
3. Return map instance

## License

GPLv3 © Yonatan Romero

[Here]: https://maps.here.com/
[credentials]: https://developer.here.com/javascript-apis/documentation/v3/maps/common/credentials.html
[languages]: https://developer.here.com/javascript-apis/documentation/v3/maps/topics/map-controls.html
