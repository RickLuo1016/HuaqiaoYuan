/* global BMapGL */
/* global lightStyle */

// Set up map initialisation
function initMap(options) {
    options = Object.assign({
        tilt: 60,
        heading: 0
    }, options);
    var map = new BMapGL.Map('map', {
        restrictCenter: false
    });
    map.setMapStyleV2({
        styleId: 'fede2f79eba4b77ba329bf8d20c91c37'
    });
    map.enableKeyboard();
    map.enableScrollWheelZoom();
    map.enableInertialDragging();
    map.enableContinuousZoom();
    map.setDisplayOptions(options.displayOptions || {
        opacity: 0,
        indoor: false,
        poi: true,
        skyColors: options.skyColors || [
            'rgba(255, 255, 255, 0.01)',
            'rgba(255, 255, 255, 1.0)'
        ]
    });
    if (options.center && options.zoom) {
        map.centerAndZoom(new BMapGL.Point(options.center[0], options.center[1]), options.zoom);
    }

    map.setTilt(options.tilt);
    map.setHeading(options.heading);
    return map;
};


var map_baidu = initMap({
    tilt: 70,
    heading: 60,
    center: [116.792957, 23.355387],
    zoom: 16
});


var view = new mapvgl.View({
    map: map_baidu
});