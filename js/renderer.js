var renderer;

function initRender() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //告诉渲染器需要阴影效果
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    document.body.appendChild(renderer.domElement);
}

var camera;

function initCamera() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 40, 100);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

var scene;

function initScene() {
    scene = new THREE.Scene();
}

//初始化dat.GUI简化试验流程
var gui;

function initGui() {
    //声明一个保存需求修改的相关数据的对象
    gui = {
        ambientLight: "#111111", //环境光源
        directionalLight: "#ffffff", //点光源
        intensity: 1, //灯光强度
        visible: true, //是否可见
        castShadow: true,
        exponent: 30,
        target: "plane",
        debug: false
    };
    var datGui = new dat.GUI();
    //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
    datGui.addColor(gui, "ambientLight").onChange(function(e) {
        ambientLight.color = new THREE.Color(e);
    });
    datGui.addColor(gui, "directionalLight").onChange(function(e) {
        directionalLight.color = new THREE.Color(e);
    });
    datGui.add(gui, "intensity", 0, 5).onChange(function(e) {
        directionalLight.intensity = e;
    });
    datGui.add(gui, "visible").onChange(function(e) {
        directionalLight.visible = e;
    });
    datGui.add(gui, "castShadow").onChange(function(e) {
        directionalLight.castShadow = e;
    });
    datGui.add(gui, "debug").onChange(function(e) {
        if (e) {
            var debug = new THREE.CameraHelper(directionalLight.shadow.camera);
            debug.name = "debug";
            scene.add(debug);
        } else {
            var debug = scene.getObjectByName("debug");
            scene.remove(debug);
        }
    });
}

var ambientLight, directionalLight;

function initLight() {
    ambientLight = new THREE.AmbientLight("#111111");
    scene.add(ambientLight);

    directionalLight = new THREE.DirectionalLight("#ffffff");
    directionalLight.position.set(-40, 60, -10);

    directionalLight.shadow.camera.near = 20; //产生阴影的最近距离
    directionalLight.shadow.camera.far = 200; //产生阴影的最远距离
    directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = 50; //最右边
    directionalLight.shadow.camera.top = 50; //最上边
    directionalLight.shadow.camera.bottom = -50; //最下面

    //这两个值决定使用多少像素生成阴影 默认512
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;

    console.log(directionalLight);

    //告诉平行光需要开启阴影投射
    directionalLight.castShadow = true;

    scene.add(directionalLight);
}

var cube, plane;

function initModel() {

    //辅助工具
    var helper = new THREE.AxisHelper(10);
    scene.add(helper);

    //立方体
    var cubeGeometry = new THREE.CubeGeometry(10, 10, 10);

    var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ffff });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = 30;
    cube.position.y = 5;
    cube.position.z = -5;

    //告诉立方体需要投射阴影
    cube.castShadow = true;

    scene.add(cube);

    //底部平面
    var planeGeometry = new THREE.PlaneGeometry(100, 100);
    var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;

    //告诉底部平面需要接收阴影
    plane.receiveShadow = true;

    scene.add(plane);

}

//初始化性能插件
var stats;

function initStats() {
    stats = new Stats();
    document.body.appendChild(stats.dom);
}

//用户交互插件 鼠标左键按住旋转，右键按住平移，滚轮缩放
var controls;

function initControls() {

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // 如果使用animate方法时，将此函数删除
    //controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = true;
    //是否自动旋转
    controls.autoRotate = false;
    //设置相机距离原点的最远距离
    controls.minDistance = 50;
    //设置相机距离原点的最远距离
    controls.maxDistance = 200;
    //是否开启右键拖拽
    controls.enablePan = true;
}

function render() {
    renderer.render(scene, camera);
}

//窗口变动触发的函数
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    //更新控制器
    render();

    //更新性能插件
    stats.update();

    controls.update();

    requestAnimationFrame(animate);
}

function draw() {
    initGui();
    initRender();
    initScene();
    initCamera();
    initLight();
    initModel();
    initControls();
    initStats();

    animate();
    window.onresize = onWindowResize;
}————————————————
版权声明： 本文为CSDN博主「 暮志未晚Webgl」 的原创文章， 遵循CC 4.0 BY - SA版权协议， 转载请附上原文出处链接及本声明。
原文链接： https: //blog.csdn.net/qq_30100043/article/details/77466395