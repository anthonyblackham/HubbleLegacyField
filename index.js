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
    L.tileLayer('https://rawgithub.com/anthonyblackham/HubbleLegacyField/master/tiles/{z}/{x}/{y}.png', {
      noWrap: true,
      attribution: 'Map <a href="http://hubblesite.org/image/4493/news_release/2019-17' +
        'File:STSCI-H-p1917b-f-20791x19201.tif">' +
        'Hubble Legacy Field</a> under ' +
        '<a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</a>'
    }).addTo(map)
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

    // set markers on click events in the map
    map.on('click', function (event) {
      // to obtain raster coordinates from the map use `project`
      var coord = rc.project(event.latlng)
      // to set a marker, ... in raster coordinates in the map use `unproject`
      var marker = L.marker(rc.unproject(coord))
        .addTo(layerBounds)
      marker.bindPopup('[' + Math.floor(coord.x) + ',' + Math.floor(coord.y) + ']')
        .openPopup()
    })

    return layerBounds
  }

  init('map')
}(window))
