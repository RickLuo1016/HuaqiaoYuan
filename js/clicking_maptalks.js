/***************************************** Point and Text ****************************************/
var vlinesLayer = new maptalks.VectorLayer('vlines', {
    enableAltitude: true,
    // draw altitude
    drawAltitude: {
        lineWidth: 1.5,
        lineColor: '#999597'
    }
});

var extent = map.getExtent();
var min = extent.getMin();
var w = extent.getWidth();
var h = extent.getHeight();
var markers = [];


//      baidu         /         WGS
//116.804392,23.362458/116.79332358,23.35921501// 高层组团
//116.800224,23.358378/116.78916284,23.35505669// 高层组团
//116.804141,23.358643/116.79307056,23.35539566// 产业组团
//116.805722,23.356984/116.79464687,23.35376525// 低层组团



function onClick1(e) {
    e.target.setInfoWindow({
        'content': '<img class="P" src="./data/photo/1.jpg">' +
            '<div id="Otext">This website is built in fulfilling Spatial Data Capture module final project requirement. The aim we are perusing placed</div>',
        'width': 300,
        'minHeight': 100,
        'dy': 5,
        'autoPan': true,
        'custom': false,
        'autoOpenOn': 'click',
          //set to null if not to open when clicking on marker
        'autoCloseOn': 'click'
    })
};

function onClick2(e) {
    e.target.setInfoWindow({
        'content': '<img class="P" src="./data/photo/2.jpg">' +
            '<div id="Otext">This website is built in fulfilling Spatial Data Capture module final project requirement. The aim we are perusing placed</div>',
        'width': 300,
        'minHeight': 100,
        'dy': 5,
        'autoPan': true,
        'custom': false,
        'autoOpenOn': 'click',
          //set to null if not to open when clicking on marker
        'autoCloseOn': 'click'
    })
};

function onClick3(e) {
    e.target.setInfoWindow({
        'content': '<img class="P" src="./data/photo/3.jpg">' +
            '<div id="Otext">This website is built in fulfilling Spatial Data Capture module final project requirement. The aim we are perusing placed</div>',
        'width': 300,
        'minHeight': 100,
        'dy': 5,
        'autoPan': true,
        'custom': false,
        'autoOpenOn': 'click',
          //set to null if not to open when clicking on marker
        'autoCloseOn': 'click'
    })
};

function onClick4(e) {
    e.target.setInfoWindow({
        'content': '<img class="P" src="./data/photo/4.jpg">' +
            '<div id="Otext">This website is built in fulfilling Spatial Data Capture module final project requirement. The aim we are perusing placed</div>',
        'width': 300,
        'minHeight': 100,
        'dy': 5,
        'autoPan': true,
        'custom': false,
        'autoOpenOn': 'click',
          //set to null if not to open when clicking on marker
        'autoCloseOn': 'click'
    })
};

function onClick5(e) {
    e.target.setInfoWindow({
        'content': '<img class="P" src="./data/photo/4.jpg">' +
            '<div id="Otext">This website is built in fulfilling Spatial Data Capture module final project requirement. The aim we are perusing placed</div>',
        'width': 300,
        'minHeight': 100,
        'dy': 5,
        'autoPan': true,
        'custom': false,
        'autoOpenOn': 'click',
          //set to null if not to open when clicking on marker
        'autoCloseOn': 'click'
    })
};
var onClick = [onClick1, onClick2, onClick3, onClick4, onClick5];

var temp = [
    [
        [116.79352358, 23.35871501], "国际金融商贸区", 300
    ],
    [
        [116.78966284, 23.35465669], "跨境电子商务区", 300
    ],
    [
        [116.79307056, 23.35539566], "华侨经济文化合作基地", 100
    ],
    [
        [116.79484687, 23.35756525], "潮汕文创设计中心", 100
    ],
    [
        [116.79224687, 23.35256525], "华侨交流会议中心", 100
    ]
];


for (var i = 0; i < temp.length; i++) {
    markers.push(new maptalks.Marker(temp[i][0], {
        properties: {
            // random altitude
            altitude: temp[i][2]
        },
        visible: true,
        editable: true,
        cursor: 'pointer',
        shadowBlur: 0,
        shadowColor: 'black',
        draggable: false,
        dragShadow: false, // display a shadow during dragging
        drawOnAxis: null, // force dragging stick on a axis, can be: x, y
        symbol: {
            'textFaceName': 'sans-serif',
            'textName': temp[i][1],
            'textHaloFill': '#fff',
            'textHaloRadius': 0.5,
            'textFill': '#547aa9',
            'textHorizontalAlignment': 'middle',
            'textSize': 20
        }
    }).on('mousedown', onClick[i]));
};

vlinesLayer.addGeometry(markers);
// map.addLayer(vlinesLayer);
/***************************************** Point and Text ****************************************/