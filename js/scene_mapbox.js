var modelOrigin = [116.792957, 23.355387];
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];

var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
    modelOrigin,
    modelAltitude
);

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
    translateX: modelAsMercatorCoordinate.x,
    translateY: modelAsMercatorCoordinate.y,
    translateZ: modelAsMercatorCoordinate.z,
    rotateX: modelRotate[0],
    rotateY: modelRotate[1],
    rotateZ: modelRotate[2],
    /* Since our 3D model is in real world meters, a scale transform needs to be
     * applied since the CustomLayerInterface expects units in MercatorCoordinates.
     */
    scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
};

var THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    onAdd: function(map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // // create two three.js lights to illuminate the model
        // var directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        // directionalLight1.position.set(0, -70, 100).normalize();
        // directionalLight1.castShadow = true;


        // var directionalLight2 = new THREE.DirectionalLight(0xffffff);
        // directionalLight2.position.set(0, 70, 100).normalize();
        // directionalLight2.castShadow = true;
        // this.scene.add(directionalLight2);

        var ambLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambLight);

        // use the three.js OBJ loader to add the 3D model to the three.js scene
        var OBJLoader0 = new THREE.OBJLoader();
        var OBJLoader1 = new THREE.OBJLoader();
        var OBJLoader2 = new THREE.OBJLoader();
        var OBJLoader3 = new THREE.OBJLoader();
        var OBJLoader4 = new THREE.OBJLoader();
        // var STLLoader = new THREE.STLLoader();
        var MTLLoader0 = new THREE.MTLLoader();
        var MTLLoader1 = new THREE.MTLLoader();
        var MTLLoader2 = new THREE.MTLLoader();
        var MTLLoader3 = new THREE.MTLLoader();
        var MTLLoader4 = new THREE.MTLLoader();

        /***************************************** loading model ****************************************/
        OBJLoader0.load(
            './data/test_1/test_1.obj',
            function(OBJ) {
                OBJ.scale.set(1.5, 1.5, 1.5);
                for (i in OBJ.children) {
                    OBJ.children[i].castShadow = true;
                    OBJ.children[i].receiveShadow = true;
                };
                this.scene.add(OBJ);
            }.bind(this)
        );
        MTLLoader0.load('./data/test_1/test_1.mtl', function(materials) {
            OBJLoader0.setMaterials(materials);
        });



        // OBJLoader2.load(
        //     './data/plain/plain.obj',
        //     function(OBJ) {
        //         OBJ.scale.set(1.5, 1.5, 1.5);
        //         for (i in OBJ.children) {
        //             OBJ.children[i].castShadow = true;
        //             OBJ.children[i].receiveShadow = true;
        //         };
        //         this.scene.add(OBJ);
        //     }.bind(this)
        // );
        // MTLLoader2.load('./data/plain/plain.mtl', function(materials) {
        //     OBJLoader2.setMaterials(materials);
        // });

        // OBJLoader3.load(
        //     './data/hotel/hotel.obj',
        //     function(OBJ) {
        //         OBJ.scale.set(1.5, 1.5, 1.5);
        //         for (i in OBJ.children) {
        //             OBJ.children[i].castShadow = true;
        //             OBJ.children[i].receiveShadow = true;
        //         };
        //         this.scene.add(OBJ);
        //     }.bind(this)
        // );
        // MTLLoader3.load('./data/hotel/hotel.mtl', function(materials) {
        //     OBJLoader3.setMaterials(materials);
        // });

        // OBJLoader4.load(
        //     './data/tradition/tradition.obj',
        //     function(OBJ) {
        //         OBJ.scale.set(1.5, 1.5, 1.5);
        //         for (i in OBJ.children) {
        //             OBJ.children[i].castShadow = true;
        //             OBJ.children[i].receiveShadow = true;
        //         };
        //         this.scene.add(OBJ);
        //     }.bind(this)
        // );
        // MTLLoader4.load('./data/tradition/tradition.mtl', function(materials) {
        //     OBJLoader4.setMaterials(materials);
        // });
        /***************************************** loading model ****************************************/





        /***************************************** create plain to receive shadow ****************************************/
        // initialise a plain to receive the shadow
        var planeGeometry = new THREE.PlaneGeometry(2000, 2000);
        var planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
        var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

        // rotate the plain to level
        planeMesh.rotateX(-Math.PI / 2);
        planeMesh.position.y = 0;

        // make true the shadow casting
        planeMesh.receiveShadow = true;
        this.scene.add(planeMesh);
        /***************************************** create plain to receive shadow ****************************************/






        /***************************************** setup lighting ****************************************/
        // Setup directional light
        var directionalLight = new THREE.DirectionalLight(0xffffea, 0.8);
        // setup light position
        directionalLight.position.set(0, 70, 40);
        this.scene.add(directionalLight);
        // make true the shadowcasting
        directionalLight.castShadow = true;
        // calculate the extent of shadow
        directionalLight.shadow.radius = 2;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 300000;
        directionalLight.shadow.camera.left = -1000;
        directionalLight.shadow.camera.right = 1000;
        directionalLight.shadow.camera.top = 1000;
        directionalLight.shadow.camera.bottom = -1000;
        // setup the resolution of shadow
        directionalLight.shadow.mapSize.set(4096, 4096);
        /***************************************** setup lighting ****************************************/



        /***************************************** text effect ****************************************/
        // OBJLoader1.load(
        //     './data/text/text.obj',
        //     function(OBJ) {
        //         for (i in OBJ.children) {
        //             OBJ.children[i].castShadow = true;
        //             OBJ.children[i].receiveShadow = true;
        //         };
        //         OBJ.position.y = 80;
        //         this.scene.add(OBJ);
        //     }.bind(this)
        // );
        // MTLLoader1.load('./data/text/text.mtl', function(materials) {
        //     OBJLoader1.setMaterials(materials);
        // });
        /***************************************** text effect ****************************************/


        this.map = map;

        // use the Mapbox GL JS map canvas for three.js
        this.renderer = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true
        });

        this.renderer.autoClear = false;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
        console.log(this.renderer);
    },

    render: function(gl, matrix) {
        var rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            modelTransform.rotateX
        );
        var rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            modelTransform.rotateY
        );
        var rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            modelTransform.rotateZ
        );

        var m = new THREE.Matrix4().fromArray(matrix);
        var l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale, -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
    }
};



map.on('style.load', function() {
    map.addLayer(customLayer, 'waterway-label');
    map.addLayer(layer)
});