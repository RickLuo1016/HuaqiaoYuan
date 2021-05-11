var AdjustWall = function(object) {
    object.rotateZ(0.75);
};
var AdjustObject = function(object) {
    object.rotateZ(-Math.PI / 2);
    object.position.z = 0.2;
};
var AdjustRoad = function(object) {
    object.rotateX(-Math.PI / 2);
    object.position.z = 0;
};
var MoveWave = function(object, scene, position) {
    MovetoSite(object);
    AdjustObject(object);
    object.translateX(position[0]);
    object.translateY(position[1]);
    scene.add(object);
};
var MoveWall = function(object, scene, position) {
    MovetoSite(object);
    AdjustWall(object);
    object.translateX(position[0]);
    object.translateY(position[1]);
    scene.add(object);
};
var MoveRoad = function(object, scene) {
    MovetoSite(object);
    AdjustRoad(object);
    scene.add(object);
};
var threeLayer2 = new maptalks.ThreeLayer('effect', {
    forceRenderOnMoving: true,
    forceRenderOnRotating: true,
    animation: true
});