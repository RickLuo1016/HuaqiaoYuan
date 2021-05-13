var threeLayer2 = new maptalks.ThreeLayer('landscape', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    animation: true
});



threeLayer2.prepareToDraw = function(gl, scene, camera) {
    var renderer = threeLayer2.getThreeRenderer({
        antialias: true
    });

    /***************************************** create plain to depict landscape ****************************************/
    // initialise a plain to receive the shadow
    var planeGeometry = new THREE.PlaneGeometry(6.323 * 2.85, 4.77 * 2.85);
    var planeMaterial = material = new THREE.MeshBasicMaterial({ transparent: true });
    let map = new THREE.TextureLoader().load('./data/photo/Zongtu0512.png');
    material.map = map; //打底贴图
    var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

    // rotate the plain to level
    MovetoSite(planeMesh);
    planeMesh.rotateZ(0.77 + Math.PI / 2);
    planeMesh.translateX(-1.04)
    planeMesh.translateY(0.405)
        //let normalMap = new THREE.TextureLoader().load(otherImage);
        //material.normalMap = normalMap;//法向贴图
        // material.normalScale = new THREE.Vector2(0.3, 0.3);//凹凸程度

    // make true the shadow casting
    planeMesh.receiveShadow = true;
    scene.add(planeMesh);
    /***************************************** create plain to depict landscape ****************************************/


    renderer.autoClear = false;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
};

map.addLayer(threeLayer2);