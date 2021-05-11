var THREE = mapvgl.THREE;
var threeLayer = new mapvgl.ThreeLayer();

var objectLoader = new THREE.ObjectLoader();

objectLoader.load("./data/plain/plain.json", function(object) {
    object.rotation.set(3.1415926 / 2, 0, 0);
    object.scale.set(1.18, 1.18, 1.18);
    for (var i = 0; i < object.children.length; i++) {
        object.children[i].material.color = new THREE.Color(1, 0.796, 0.429);
        object.children[i].material.transparent = true;
        object.children[i].material.opacity = 0.6;
        for (var j = 0; j < object.children[i].material.length; j++) {
            object.children[i].material[j].color = new THREE.Color(1, 0.796, 0.429);
            object.children[i].material[j].transparent = true;
            object.children[i].material[j].opacity = 0.6;
        }
        group = object;
    }
    object.children[6].visible = false;
    threeLayer.add(object, new BMapGL.Point(13217250, 3742290)); //设置模型位置坐标
    var light = new THREE.DirectionalLight('#ffffff', 2); //添加灯光
    light.position.set(100, 100, 100);
    light.lookAt(0, 0, 0);
    threeLayer.scene.add(light);
});