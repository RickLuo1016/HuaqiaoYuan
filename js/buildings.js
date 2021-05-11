var shapeLayer = new mapvgl.ShapeLayer({
    color: '#f9f6ec', // 柱状图颜色
    enablePicked: true, // 是否可以拾取
    selectedIndex: -1, // 选中项
    selectedColor: '#f797a0', // 选中项颜色
    autoSelect: true, // 根据鼠标位置来自动设置选中项
    onClick: (e) => { // 点击事件
        console.log(e);
    },
});
view.addLayer(shapeLayer);
shapeLayer.setData(data);

map.setDefaultCursor('default');



/*
setInterval(() => {
    polygons = polygons.map((item) => {
        item.properties.preHeight = item.properties.height;
        item.properties.height = Math.random() * 100;
        return item;
    });
    shapeLayer.setData(polygons);
}, 2000);
*/