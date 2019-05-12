/* global L */
;(function (window) {
  function init (mapid) {
    var minZoom = 0
    var maxZoom = 6
    var img = [
      20791, // original width of image `karta.jpg`
      19201  // original height of image
    ]

    // create the map
    var map = L.map(mapid, {
      minZoom: minZoom,
      maxZoom: maxZoom
    })

    // assign map and image dimensions
    var rc = new L.RasterCoords(map, img)

    // set the view on a marker ...
    map.setView(rc.unproject([1589, 1447]), 2)

    // add layer control object
    L.control.layers({}, {
      'Bounds': layerBounds(map, rc, img),
    }).addTo(map)

    // the tile layer containing the image generated with gdal2tiles --leaflet ...
    L.tileLayer('https://raw.githubusercontent.com/anthonyblackham/HubbleLegacyField/master/tiles/{z}/{x}/{y}.png', {
      noWrap: true,
      attribution: 'Map <a href="http://hubblesite.org/news_release/news/2019-17' +
        'Hubble Legacy Field</a> under ' +
        '<a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</a>'
    }).addTo(map)
    
    map.addControl(new L.Control.Fullscreen());
  }

  /**
   * layer with markers
   */
  function layerBounds (map, rc, img) {
    // set marker at the image bound edges
    var layerBounds = L.layerGroup([
      L.marker(rc.unproject([0, 0])).bindPopup('[0,0]'),
      L.marker(rc.unproject(img)).bindPopup(JSON.stringify(img))
    ])
    map.addLayer(layerBounds)

    return layerBounds
  }

  init('map')
}(window))
