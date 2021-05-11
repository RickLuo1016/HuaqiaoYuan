var OBJLoader = new THREE.OBJLoader(); // obj loader
var scene = new THREE.Scene();
var mesh = null; // declare a mesh variable



OBJLoader.load('./data/model2.obj', function(obj) {

    // the return stucture in console should include a group with a mesh in it
    console.log(obj);
    scene.add(obj);

    // acquire mesh
    mesh = obj.children[0];
    // mesh model scale
    mesh.scale.set(10, 10, 10);

    // initialise a texture loader
    var textureLoader = new THREE.TextureLoader();

})