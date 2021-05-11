var flyLines = {
    "coordinatesPairs": [
        [
            [116.79332358, 23.35921501],
            [116.78916284, 23.35505669]
        ],
        [
            [116.79307056, 23.35539566],
            [116.79464687, 23.35376525]
        ]
    ]
};
// var chartDom = document.getElementById('map');
// var myChart = echarts.init(chartDom);
var e3Layer = new maptalks.E3Layer('e3', {
    geo3D: {
        map: 'world',
        shading: 'color',
        silent: true,

        groundPlane: {
            show: false
        },
        light: {
            main: {
                intensity: 0
            },
            ambient: {
                intensity: 0
            }
        },
        viewControl: {
            distance: 50
        },

        itemStyle: {
            color: '#111'
        },

        boxHeight: 0.5
    },
    series: [{
        type: 'lines3D',

        coordinateSystem: 'geo3D',

        effect: {
            show: true,
            trailWidth: 2,
            trailLength: 0.2
        },

        blendMode: 'lighter',

        lineStyle: {
            width: 0,
            color: 'rgb(50, 50, 150)',
            opacity: 0.2
        },

        data: flyLines
    }]
});
map.addLayer(e3Layer)