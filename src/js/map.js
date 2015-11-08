L.mapbox.accessToken = 'pk.eyJ1IjoiY2JsZXkiLCJhIjoiR2N1SVFwayJ9.VS8A7T-jmRQHYwG1mwBaHw';

var imageryUrls = {
  flood: '//cbley.com/tiles/ivan_2004/{z}/{x}/{y}.png',
  naip: '//cbley.com/tiles/naip_2005_dauphin_co/{z}/{x}/{y}.png'
}

var southWest = L.latLng(40.0039, -76.9557),
    northEast = L.latLng(40.3051, -76.4359),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map', null, {
  maxZoom: 18,
  minZoom: 13,
  maxBounds: bounds
});

var riverBoundaries = L.mapbox.featureLayer().addTo(map);
riverBoundaries.loadURL('data/riverBoundaries.geojson');

var naip2005Imagery = L.tileLayer(imageryUrls.naip, {tms: 'true'}).addTo(map);
var floodImagery = L.tileLayer(imageryUrls.flood, {tms: 'true'}).addTo(map);


var range = document.getElementById('range');

// this function from https://www.mapbox.com/blog/swipe-layers/
function clip() {
  var nw = map.containerPointToLayerPoint([0, 0]),
      se = map.containerPointToLayerPoint(map.getSize()),
      clipX = nw.x + (se.x - nw.x) * range.value;

  floodImagery.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
}

range['oninput' in range ? 'oninput' : 'onchange'] = clip;
map.on('move', clip);
map.setView([40.25665, -76.88955], 16);

clip();
