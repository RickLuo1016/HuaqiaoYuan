mapboxgl.accessToken = 'pk.eyJ1IjoicmVlcGx5IiwiYSI6ImNrbnpjOWhuczA0ZHkyeHBnM3lhbDN2cjUifQ.O_8ANwK_PvhG62ey-rdS6Q';
var map = window.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/reeply/cknzcqpl44o8717oallb9fn8q',
    zoom: 16,
    center: [116.792957, 23.355387],
    pitch: 60,
    antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
});