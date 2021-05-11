var threeLayer1 = new maptalks.ThreeLayer('model', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    animation: true
});

var MovetoSite = function(object) {
    object.rotateZ(-Math.PI / 2);
    object.position.y = 0;

    object.translateY(39479.757517 * 2 + 6086.51);
    object.translateX(-2586.191500 * 6 - 1981.33);
};




threeLayer1.prepareToDraw = function(gl, scene, camera) {
    var renderer = threeLayer1.getThreeRenderer({
        antialias: true
    });


    /***************************************** create plain to receive shadow ****************************************/
    // initialise a plain to receive the shadow
    var planeGeometry = new THREE.PlaneGeometry(50, 50);
    var planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate the plain to level
    MovetoSite(planeMesh);

    // make true the shadow casting
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);
    /***************************************** create plain to receive shadow ****************************************/


    /***************************************** shadow/light setting ****************************************/
    var ambLight = new THREE.AmbientLight(0xffeaa8, 0.3);
    scene.add(ambLight);
    var directionalLight = new THREE.DirectionalLight(0xffffea, 1.5);
    // setup light position
    directionalLight.position.set(10000, 10000, 100000);

    // make true the shadowcasting
    directionalLight.castShadow = true;

    // calculate the extent of shadow
    directionalLight.shadow.radius = 2;

    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 300000;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;

    // setup the resolution of shadow
    directionalLight.shadow.mapSize.set(4096, 4096);
    scene.add(directionalLight);
    // camera.add(directionalLight)
    /***************************************** shadow/light setting ****************************************/



    /***************************************** model loading ****************************************/
    // use the three.js OBJ loader to add the 3D model to the three.js scene

    // var STLLoader = new THREE.STLLoader();
    // var MTLLoader0 = new THREE.MTLLoader();

    // var onProgress = function(xhr) {
    //     if (xhr.lengthComputable) {
    //         var percentComplete = (xhr.loaded / xhr.total) * 100;
    //         console.log(Math.round(percentComplete, 2) + "% downloaded");
    //     }
    // };

    // var onError = function() {
    //     // 载入出错时候
    for (var i = 1; i <= 6; i++) {
        new THREE.ColladaLoader().load('./data/test/moxing00' + String(i) + '.dae', function(DAE) {
            mesh = DAE.scene.children[0];
            mesh.scale.set(0.00018, 0.00018, 0.00018);
            mesh.translateX(39479.757517 * 2 + 6086.5);
            mesh.translateY(2586.191500 * 7 - 604.9);
            directionalLight.target = mesh;

               
            mesh.traverse(function(child) {          
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                }
            })
            scene.add(mesh)
        });
    }

    // var OBJLoader = new THREE.OBJLoader();
    // OBJLoader.load(
    //     './data/test/test0.obj',
    //     function(OBJ) {
    //         /***************************************** position adjustment ****************************************/
    //         OBJ.scale.set(0.0104, 0.0104, 0.0104);
    //         OBJ.rotateX(Math.PI / 2);
    //         OBJ.translateX(39479.757517 * 2 + 6086.51);
    //         OBJ.translateZ(-2586.191500 * 6 - 1981.33);

    //         /***************************************** position adjustment ****************************************/
    //         directionalLight.target = OBJ;
    //         for (i in OBJ.children) {
    //             OBJ.children[i].castShadow = true;
    //             OBJ.children[i].receiveShadow = true;
    //         };
    //         scene.add(OBJ);
    //         console.log(OBJ)

    //     }, onProgress, onError
    // );
    // MTLLoader0.load('./data/test/final.mtl', function(materials) {
    //     OBJLoader0.setMaterials(materials)
    // });
    // new THREE.GLTFLoader()
    //     .setPath('./data/test/')
    //     .load('final.gltf', function(gltf) {
    //             scene.add(gltf.scene);
    //             console.log("finished");
    //         }, onProgress,
    //         onError
    //     );
    /***************************************** smodel loading ****************************************/



    // /***************************************** wall effect ****************************************/
    // // var axesHelper = new THREE.AxesHelper(5);
    // // MovetoSite(axesHelper);
    // // scene.add(axesHelper);
    // var drawWall = function(lineVectices, height, transparence, color) {
    //     var base = new THREE.Shape();
    //     base.moveTo(lineVectices[0][0], lineVectices[0][1])
    //     for (var i = 1; i < lineVectices.length; i++) {
    //         base.lineTo(lineVectices[i][0], lineVectices[i][1])
    //     };

    //     var extrudeSettings = {
    //         steps: 2,
    //         depth: height,
    //         bevelEnabled: false,
    //     };

    //     var geometry = new THREE.ExtrudeGeometry(base, extrudeSettings);

    //     var wall = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
    //         vertexShader: `
    //                 varying vec3 iPosition;
    //                 void main(){
    //                     iPosition = position;
    //                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //                 }
    //             `,
    //         fragmentShader: `
    //                 varying vec3 iPosition;
    //                 uniform float time;
    //                 void main(){
    //                     vec3 color = vec3(` + color[0] + `/255.,` + color[1] + `/255.,` + color[2] + `/255.);
    //                     float height = iPosition.z + 0.1;
    //                     float white = (distance(vec2(iPosition.x,iPosition.y),vec2(0.0))-6.0)/(6.0 * (sqrt(2.0)-1.0));
    //                     float alphax = smoothstep(0.0,1.0,white);
    //                     float alphay = smoothstep(1.0,0.0,height/` + String(transparence) + ` + sin(time) * 0.2 );
    //                     if(height<0.0||height>29.9){
    //                         discard;
    //                     }
    //                     gl_FragColor = vec4(color +vec3(255.,0.,0.)* alphax * 0.0008,alphay*0.7);  
    //                 }
    //             `,
    //         transparent: true,
    //         depthWrite: false,
    //         side: THREE.DoubleSide,
    //     }));
    //     return wall
    // };
    // var wallVertices = [
    //     [
    //         [-2.5, -4.2],
    //         [-2.5, 4],
    //         [-0.3, 4],
    //         [2.6, -4.2],
    //         [-2.5, -4.2]
    //     ],
    //     [
    //         [2.7, -4.2],
    //         [-0.2, 4],
    //         [0.9, 4],
    //         [3.7, -4.2],
    //         [2.7, -4.2]
    //     ],
    //     [
    //         [0, 0],
    //         [0, 2],
    //         [2.6, 2],
    //         [2.6, 0],
    //         [0, 0]
    //     ],
    //     [
    //         [0, 0.3],
    //         [0, 1.7],
    //         [1.7, 1.7],
    //         [2.1, 0.3],
    //         [0, 0.3]
    //     ]
    // ];

    // var wallPositionAdjust = [
    //     [0, 0],
    //     [0, 0],
    //     [-2.5, -3.2],
    //     [-2.5, 1.0]
    // ];
    // var wallColor = [
    //     ["84.", "122.", "169."],
    //     ["126.", "169.", "84."],
    //     ["244.", "56.", "101."],
    //     ["244.", "56.", "101."]
    // ];

    // var wallHeight = [0.3, 0.3, 2, 2];
    // var wallTransparence = [0.3, 0.3, .7, 0.7, ];
    // var wallNum = 4;
    // for (var i = 0; i < wallNum; i++) {
    //     let wall = drawWall(wallVertices[i], wallHeight[i], wallTransparence[i], wallColor[i]);
    //     MoveWall(wall, scene, wallPositionAdjust[i])
    // };

    /***************************************** wall effect ****************************************/



    // /***************************************** Animated Point ****************************************/
    // function Wave(r, init, ring, color, speed) {
    //     var uniform = {
    //         u_color: { value: color },
    //         u_r: { value: init },
    //         u_ring: {
    //             value: ring,
    //         },
    //     };

    //     var vs = `
    //         varying vec3 vPosition;
    //         void main(){
    //             vPosition=position;
    //             gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //         }
    //     `;
    //     var fs = `
    //         varying vec3 vPosition;
    //         uniform vec3 u_color;
    //         uniform float u_r;
    //         uniform float u_ring;

    //         void main(){
    //             float pct=distance(vec2(vPosition.x,vPosition.y),vec2(0.0));
    //             if(pct>u_r || pct<(u_r-u_ring)){
    //                 gl_FragColor = vec4(1.0,0.0,0.0,0);
    //             }else{
    //                 float dis=(pct-(u_r-u_ring))/(u_r-u_ring);
    //                 gl_FragColor = vec4(u_color,dis);
    //             }
    //         }
    //     `;
    //     const geometry = new THREE.CircleGeometry(r, 120);
    //     var material = new THREE.ShaderMaterial({
    //         vertexShader: vs,
    //         fragmentShader: fs,
    //         side: THREE.DoubleSide,
    //         uniforms: uniform,
    //         transparent: true,
    //         depthWrite: false,
    //     });
    //     const circle = new THREE.Mesh(geometry, material);

    //     function animate1() {
    //         uniform.u_r.value += speed || 0.1;
    //         if (uniform.u_r.value >= r) {
    //             uniform.u_r.value = init;
    //         }
    //         requestAnimationFrame(animate1);
    //     }
    //     animate1();

    //     return circle;
    // }
    // var waveNum = 5;
    // var wavePositionAdjust = [
    //     [2.5, 0.5],
    //     [-0.6, -2.4],
    //     [0, 0],
    //     [-1.5, -1.5],
    //     [0.5, 2.5]
    // ];
    // for (var i = 0; i < waveNum; i++) {
    //     let wave = Wave(1, 0.1, 0.3, new THREE.Vector3(1, 0.8, 0.22), 0.02);
    //     MoveWave(wave, scene, wavePositionAdjust[i])
    // };
    // /***************************************** Animated Point ****************************************/



    // /***************************************** Animated Road ****************************************/
    // var Road = function(roadVectices) {
    //     let texture = new THREE.TextureLoader().load("./data/road/line.png")
    //     texture.wrapS = texture.wrapT = THREE.RepeatWrapping; //每个都重复
    //     texture.repeat.set(1, 1)
    //     texture.needsUpdate = true

    //     let material = new THREE.MeshBasicMaterial({
    //         map: texture,
    //         side: THREE.DoubleSide,
    //         transparent: true,
    //         depthWrite: false
    //     });

    //     let points = [];
    //     for (var i = 0; i < roadVectices.length; i++) {
    //         points.push(new THREE.Vector3(roadVectices[i][0], roadVectices[i][1], roadVectices[i][2]))
    //     };
    //     let curve = new THREE.CatmullRomCurve3(points);
    //     let tubeGeometry = new THREE.TubeGeometry(curve, 80, 0.1);
    //     let road = new THREE.Mesh(tubeGeometry, material);

    //     function animate2() {
    //         // 一定要在此函数中调用
    //         renderer.render(scene, camera);
    //         if (texture) texture.offset.x -= 0.02;
    //         requestAnimationFrame(animate2);
    //     }
    //     animate2();
    //     return road;
    // };
    // var roadNum = 4;
    // var roadVectices = [
    //     [
    //         [-3.8, 0, 2.3],
    //         [0.1, 0, 0],
    //         [2.9, 0, -3.0]
    //     ],
    //     [
    //         [-1.8, 0, -1.8],
    //         [0.1, 0, 0],
    //         [1.7, 0, 1.7]
    //     ],
    //     [
    //         [-2, 0, 3.6],
    //         [1.7, 0, 1.7],
    //         [5.8, 0, -0.5]
    //     ],
    //     [
    //         [-4.8, 0, 1.5],
    //         [-1.8, 0, -1.8],
    //         [1.0, 0, -5.0]
    //     ]
    // ]
    // for (var i = 0; i < roadNum; i++) {
    //     let road = Road(roadVectices[i])
    //     MoveRoad(road, scene);
    // }
    // /***************************************** Animated Road ****************************************/

    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};

map.addLayer(threeLayer1);