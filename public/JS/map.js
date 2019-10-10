// initialize the map on the "map" div with a given center and zoom
const mapElement = document.getElementById('map-container');
let map = L.map('mapElement', {
    center: [51.505, -0.09],
    zoom: 13
});