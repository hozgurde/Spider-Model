var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix;

var instanceMatrix;

var modelViewMatrixLoc;

var torsoId = 0; 
var backTorsoId = 1;
var leftUpperHeadId = 2;
var leftLowerHeadId = 3;
var rightUpperHeadId = 4;
var rightLowerHeadId = 5;
var leftArm1UpperId = 6;
var leftArm1MidId = 7;
var leftArm1LowerId = 8;
var leftArm2UpperId = 9;
var leftArm2MidId = 10;
var leftArm2LowerId = 11;
var leftArm3UpperId = 12;
var leftArm3MidId = 13;
var leftArm3LowerId = 14;
var leftArm4UpperId = 15;
var leftArm4MidId = 16;
var leftArm4LowerId = 17;
var rightArm1UpperId = 18;
var rightArm1MidId = 19;
var rightArm1LowerId = 20;
var rightArm2UpperId = 21;
var rightArm2MidId = 22;
var rightArm2LowerId = 23;
var rightArm3UpperId = 24;
var rightArm3MidId = 25;
var rightArm3LowerId = 26;
var rightArm4UpperId = 27;
var rightArm4MidId = 28;
var rightArm4LowerId = 29;
var floorId = 30;
var leftSmallEye= 31;
var leftBigEye=32;
var rightSmallEye= 33;
var rightBigEye=34;

var maxAngles = [
	180,
	15,
	25,
	15,
	25,
	15,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30,
	30
]

var walking = false;

var dimentions = [
    vec3(1, 2, 1),
    vec3(2, 3, 2),
    vec3(0.2, 0.2, 1),
    vec3(0.2, 0.2, 1),
    vec3(0.2, 0.2, 1),
    vec3(0.2, 0.2, 1),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(0.2, 0.2, 1.5),
    vec3(20,20, 0.1),//floor
    vec3(0.1, 0.1, 0.1),
    vec3(0.15, 0.15, 0.15),
    vec3(0.1, 0.1, 0.1),
    vec3(0.15, 0.15, 0.15),
];

var color = [
    vec4(0.0, 0.0, 0.0, 1.0),
    vec4(0.0, 0.0, 0.0, 0.8),
    vec4(0.52, 0.37, 0.26, 1.0),
    vec4(0.52, 0.37, 0.26, 1.0),
    vec4(0.52, 0.37, 0.26, 1.0),
    vec4(0.52, 0.37, 0.26, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.0, 0.0, 0.0, 0.9),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 1.0, 0.2, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0),
    vec4(1.0, 0.0, 0.0, 1.0)
];

var numNodes = 35;

var frameSpeed = 1;
var curFrameSpeed =0;

var theta = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var phi = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

var walkUpperTheata = [ 30, 25, 20, 15, 10, 5, 0, -5, -10, -15, -20, -25, -30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25 ];
var walkUpperPhi = [ 30 ,27.5, 25, 22.5,20,17.5,15,12.5,10,7.5,5,2.5,0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5];
var walkMiddlePhi = [-24, -18, -12, -6, 0, 6, 12, 18, 24, 18, 12, 6, 0 , -2, -4, -6, -8, -10, -12, -14, -16, -18, -20, -22];
var walkLowerPhi = [-30, -24, -18, -12, -6, 0, 3, 6, 9, 12, 9, 6, 3, 0 , -3, -6, -9, -12, -15, -18, -21, -24, -27, -30, -30];
var walkBackTorsoTheta = [15, 12.5, 10, 7.5, 5, 2.5, 0, -2.5, -5, -7.5, -10, -12.5, -15, -12.5, -10, -7.5, -5, -2.5, 0, 2.5, 5, 7.5, 10, 12.5];
var walkHeadTheta = [-15, -12.5, -10, -7.5, -5, -2.5, 0, 2.5, 5, 7.5, 10, 12.5, 15, 12.5, 10, 7.5, 5, 2.5, 0, -2.5, -5, -7.5, -10, -12.5 ];

var stack = [];
var figure = [];

for (var i = 0; i < numNodes; i++) figure[i] = createNode(null, null, null, null, null);

var vBuffer;
var cBuffer;
var circleLength;
var sideLength;
var sphereLength;
var cubeLength;

var curFrame;

var pointsArray = [];

var selectedType = 0;//0 = torso, 1 = Arm or Head
var selectedTorso = 0; // 0 = Back, 1 = Front
var selectedArm = 0; // 0 for head others itself
var selectedSide = 0; // 0 = Left, 1 = Right
var selectedArmPart = 0; // 0 = Upper, 1= Middle, 2 = Lower

//-------------------------------------------
//scaling matrix
function scale4(a, b, c) {
    var result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}

//--------------------------------------------


//Creates node with given features
function createNode(transform, render, sibling, child) {
    var node = {
        transform: transform,
        render: render,
        sibling: sibling,
        child: child
    }
    return node;
}

//Initializes node with given id
function initNodes(Id) {

    var m = mat4();

    switch (Id) {
        case torsoId:

            m = rotate(theta[torsoId] , 0, 1, 0);
			m = mult(m, rotate(phi[torsoId] - 60, 1, 0, 0));
			m = mult(m, rotate(45, 0, 0, 1));
            figure[torsoId] = createNode(m, drawSphere, null, backTorsoId);
            break;

        case backTorsoId:

            m = translate(0, -dimentions[torsoId][1], 0.0);
            m = mult(m, rotate(theta[backTorsoId], 0, 0, 1));
			m = mult(m, rotate(phi[backTorsoId], 1, 0, 0));
			m = mult(m, translate(0, -dimentions[backTorsoId][1], 0.0));
            figure[backTorsoId] = createNode(m, drawSphere, leftUpperHeadId, null);
            break;

        case leftUpperHeadId:

            m = translate(0, dimentions[torsoId][1], 0.0);
			m = mult(m, rotate(theta[leftUpperHeadId], 0, 0, 1));
            m = mult(m, rotate(30, 0, 0, 1));
			m = mult(m, rotate(phi[leftUpperHeadId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[leftUpperHeadId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[leftUpperHeadId] = createNode(m, drawCylinder, rightUpperHeadId, leftLowerHeadId);
            break;

        case leftLowerHeadId:
            m = translate(0, 0, -dimentions[leftUpperHeadId][2] / 2);
			m = mult(m, rotate(theta[leftLowerHeadId], 0, 1, 0));
			m = mult(m, rotate(phi[leftLowerHeadId], 1, 0, 0));
            m = mult(m, rotate(-20, 0, 1, 0));
            m = mult(m, translate(0, 0, -dimentions[leftLowerHeadId][2] / 2));
            figure[leftLowerHeadId] = createNode(m, drawCylinder, null, null);
            break;

        case rightUpperHeadId:

            m = translate(0, dimentions[torsoId][1], 0.0);
			m = mult(m, rotate(theta[rightUpperHeadId], 0, 0, 1));
            m = mult(m, rotate(-30, 0, 0, 1));
			m = mult(m, rotate(phi[rightUpperHeadId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[rightUpperHeadId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[rightUpperHeadId] = createNode(m, drawCylinder, leftArm1UpperId, rightLowerHeadId);
            break;

        case rightLowerHeadId:

            m = translate(0, 0, -dimentions[rightUpperHeadId][2] / 2);
			m = mult(m, rotate(theta[rightLowerHeadId], 0, 1, 0));
			m = mult(m, rotate(phi[rightLowerHeadId], 1, 0, 0));
            m = mult(m, rotate(20, 0, 1, 0));
            m = mult(m, translate(0, 0, -dimentions[rightLowerHeadId][2] / 2));
            figure[rightLowerHeadId] = createNode(m, drawCylinder, null, null);
            break;

        case leftArm1UpperId:

            m = translate(-0.75 * dimentions[torsoId][0], 0.65 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(40 + theta[leftArm1UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[leftArm1UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[leftArm1UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[leftArm1UpperId] = createNode(m, drawCylinder, leftArm2UpperId, leftArm1MidId);
            break;

        case leftArm1MidId:

            m = translate(0, 0, -dimentions[leftArm1UpperId][2] / 2);
			
            m = mult(m, rotate(15 + theta[leftArm1MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[leftArm1MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm1MidId][2] / 2));
            figure[leftArm1MidId] = createNode(m, drawCylinder, null, leftArm1LowerId);
            break;

        case leftArm1LowerId:

            m = translate(0, 0, -dimentions[leftArm1MidId][2] / 2);
			
            m = mult(m, rotate(-15 + theta[leftArm1LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[leftArm1LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm1LowerId][2] / 2));
            figure[leftArm1LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case leftArm2UpperId:

            m = translate(-0.95 * dimentions[torsoId][0], 0.15 * dimentions[torsoId][1], 0);
			
            m = mult(m, rotate(60 + theta[leftArm2UpperId], 0, 0, 1));
			m = mult(m, rotate(30+ phi[leftArm2UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[leftArm2UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[leftArm2UpperId] = createNode(m, drawCylinder, leftArm3UpperId, leftArm2MidId);
            break;

        case leftArm2MidId:

            m = translate(0, 0, -dimentions[leftArm2UpperId][2] / 2);
			
            m = mult(m, rotate(15  + theta[leftArm2MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[leftArm2MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm2MidId][2] / 2));
            figure[leftArm2MidId] = createNode(m, drawCylinder, null, leftArm2LowerId);
            break;

        case leftArm2LowerId:

            m = translate(0, 0, -dimentions[leftArm2UpperId][2] / 2);
			
            m = mult(m, rotate(-15 + theta[leftArm2LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[leftArm2LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm2LowerId][2] / 2));
            figure[leftArm2LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case leftArm3UpperId:

            m = translate(-0.95 * dimentions[torsoId][0], -0.15 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(120 + theta[leftArm3UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[leftArm3UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[leftArm3UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[leftArm3UpperId] = createNode(m, drawCylinder, leftArm4UpperId, leftArm3MidId);
            break;

        case leftArm3MidId:

            m = translate(0, 0, -dimentions[leftArm3UpperId][2] / 2);
            m = mult(m, rotate(15 + theta[leftArm3MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[leftArm3MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm3MidId][2] / 2));
            figure[leftArm3MidId] = createNode(m, drawCylinder, null, leftArm3LowerId);
            break;

        case leftArm3LowerId:

            m = translate(0, 0, -dimentions[leftArm3UpperId][2] / 2);
            m = mult(m, rotate(15 + theta[leftArm3LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[leftArm3LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm3LowerId][2] / 2));
            figure[leftArm3LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case leftArm4UpperId:

            m = translate(-0.75 * dimentions[torsoId][0], -0.65 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(140 + theta[leftArm4UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[leftArm4UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[leftArm4UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[leftArm4UpperId] = createNode(m, drawCylinder, rightArm1UpperId, leftArm4MidId);
            break;

        case leftArm4MidId:

            m = translate(0, 0, -dimentions[leftArm4UpperId][2] / 2);
            m = mult(m, rotate(15 + theta[leftArm4MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[leftArm4MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm4MidId][2] / 2));
            figure[leftArm4MidId] = createNode(m, drawCylinder, null, leftArm4LowerId);
            break;

        case leftArm4LowerId:

            m = translate(0, 0, -dimentions[leftArm4UpperId][2] / 2);
            m = mult(m, rotate(15 + theta[leftArm4LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[leftArm4LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[leftArm4LowerId][2] / 2));
            figure[leftArm4LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case rightArm1UpperId:

            m = translate(0.75 * dimentions[torsoId][0], 0.65 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(-40 + theta[rightArm1UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[rightArm1UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[rightArm1UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[rightArm1UpperId] = createNode(m, drawCylinder, rightArm2UpperId, rightArm1MidId);
            break;

        case rightArm1MidId:

            m = translate(0, 0, -dimentions[rightArm1UpperId][2] / 2);
            m = mult(m, rotate(-15 + theta[rightArm1MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[rightArm1MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm1MidId][2] / 2));
            figure[rightArm1MidId] = createNode(m, drawCylinder, null, rightArm1LowerId);
            break;

        case rightArm1LowerId:

            m = translate(0, 0, -dimentions[rightArm1MidId][2] / 2);
            m = mult(m, rotate(15 + theta[rightArm1LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[rightArm1LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm1LowerId][2] / 2));
            figure[rightArm1LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case rightArm2UpperId:

            m = translate(0.95 * dimentions[torsoId][0], 0.15 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(-60 + theta[rightArm2UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[rightArm2UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[rightArm2UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[rightArm2UpperId] = createNode(m, drawCylinder, rightArm3UpperId, rightArm2MidId);
            break;

        case rightArm2MidId:

            m = translate(0, 0, -dimentions[rightArm2UpperId][2] / 2);
            m = mult(m, rotate(-15 + theta[rightArm2MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[rightArm2MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm2MidId][2] / 2));
            figure[rightArm2MidId] = createNode(m, drawCylinder, null, rightArm2LowerId);
            break;

        case rightArm2LowerId:

            m = translate(0, 0, -dimentions[rightArm2UpperId][2] / 2);
            m = mult(m, rotate(15 + theta[rightArm2LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[rightArm2LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm2LowerId][2] / 2));
            figure[rightArm2LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case rightArm3UpperId:

            m = translate(0.95 * dimentions[torsoId][0], -0.15 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(-120 + theta[rightArm3UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[rightArm3UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[rightArm3UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[rightArm3UpperId] = createNode(m, drawCylinder, rightArm4UpperId, rightArm3MidId);
            break;

        case rightArm3MidId:

            m = translate(0, 0, -dimentions[rightArm3UpperId][2] / 2);
            m = mult(m, rotate(-15 + theta[rightArm3MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[rightArm3MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm3MidId][2] / 2));
            figure[rightArm3MidId] = createNode(m, drawCylinder, null, rightArm3LowerId);
            break;

        case rightArm3LowerId:

            m = translate(0, 0, -dimentions[rightArm3UpperId][2] / 2);
            m = mult(m, rotate(-15 + theta[rightArm3LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[rightArm3LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm3LowerId][2] / 2));
            figure[rightArm3LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case rightArm4UpperId:

            m = translate(0.75 * dimentions[torsoId][0], -0.65 * dimentions[torsoId][1], 0);
            m = mult(m, rotate(-140 + theta[rightArm4UpperId], 0, 0, 1));
			m = mult(m, rotate(30 + phi[rightArm4UpperId], 1, 0, 0));
            m = mult(m, translate(0, dimentions[rightArm4UpperId][2] / 2, 0.0));
            m = mult(m, rotate(90, 1, 0, 0));
            figure[rightArm4UpperId] = createNode(m, drawCylinder, floorId, rightArm4MidId);
            break;

        case rightArm4MidId:

            m = translate(0, 0, -dimentions[rightArm4UpperId][2] / 2);
			m = mult(m, rotate(-15 + theta[rightArm4MidId], 0, 1, 0));
			m = mult(m, rotate(-80 + phi[rightArm4MidId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm4MidId][2] / 2));
            figure[rightArm4MidId] = createNode(m, drawCylinder, null, rightArm4LowerId);
            break;

        case rightArm4LowerId:

            m = translate(0, 0, -dimentions[rightArm4UpperId][2] / 2);
            m = mult(m, rotate(-15 + theta[rightArm4LowerId], 0, 1, 0));
			m = mult(m, rotate(10 + phi[rightArm4LowerId], 1, 0, 0));
            m = mult(m, translate(0, 0, -dimentions[rightArm4LowerId][2] / 2));
            figure[rightArm4LowerId] = createNode(m, drawCylinder, null, null);
            break;

        case floorId:
            m = translate(0, 0, -dimentions[backTorsoId][2]);
            figure[floorId] = createNode(m, drawCube, leftSmallEye, null);
            break;

        case leftSmallEye:
            m = translate(-0.4*dimentions[torsoId][0], 0.75*dimentions[torsoId][1], 0.65*dimentions[torsoId][2]);
            figure[leftSmallEye] = createNode(m, drawSphere, leftBigEye, null);
            break;

        case leftBigEye:
            m = translate(-0.15*dimentions[torsoId][0], 0.8*dimentions[torsoId][1], 0.6*dimentions[torsoId][2]);
            figure[leftBigEye] = createNode(m, drawSphere, rightSmallEye, null);
            break;

        case rightSmallEye:
            m = translate(0.4*dimentions[torsoId][0], 0.75*dimentions[torsoId][1], 0.65*dimentions[torsoId][2]);
            figure[rightSmallEye] = createNode(m, drawSphere, rightBigEye, null);
            break;

        case rightBigEye:
            m = translate(0.15*dimentions[torsoId][0], 0.8*dimentions[torsoId][1], 0.6*dimentions[torsoId][2]);
            figure[rightBigEye] = createNode(m, drawSphere, null, null);
            break;
    }

}

//traverses and renders all the nodes
function traverse(Id) {
    if (Id == null) return;
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform); //apply current transformations
    figure[Id].render(0, 0, 0, dimentions[Id][0], dimentions[Id][1], dimentions[Id][2], color[Id]); //render current node
    if (figure[Id].child != null) traverse(figure[Id].child); //check and render children of node
    modelViewMatrix = stack.pop();
    if (figure[Id].sibling != null) traverse(figure[Id].sibling); //check and render siblings of current node
}

window.onload = function init() {

	//init canvas
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

	//init canvas properties
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.8, 1.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders(gl, "vertex-shader", "fragment-shader");

    gl.useProgram(program);

    instanceMatrix = mat4();

    projectionMatrix = ortho(-10.0, 10.0, -10.0, 10.0, -10.0, 10.0);
    modelViewMatrix = mat4();


    gl.uniformMatrix4fv(gl.getUniformLocation(program, "modelViewMatrix"), false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projectionMatrix));

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")

	//Add vertices of cylinder, sphere and cube to the buffer
    cylinder();
    sphere();
    cube();

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    vPosition = gl.getAttribLocation(program, 'vPosition');
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, pointsArray.length * 16, gl.STATIC_DRAW);

    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

	//initialize save load user interface
	var saveButton = document.getElementById("save");
	var fileName = document.getElementById("fname");
	var fileRead = document.getElementById("file-selector");
	
	//Add event listener to save button
	saveButton.addEventListener("click", function(){
		// use '|' for splitter
		var data = walking + "|" + frameSpeed + "|" + curFrameSpeed + "|" +
					theta + "|" + phi;
		var f = fileName.value + ".txt";//name file as txt file
		var textFileAsBlob = new Blob([data], {type:'text/plain'});
		var downloadLink = document.createElement("a");
		downloadLink.download = f;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			// Chrome allows the link to be clicked
			// without actually adding it to the DOM.
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			// Firefox requires the link to be added to the DOM
			// before it can be clicked.
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}
		downloadLink.click(); //click download link
	});
	
	//Event listener for reading file button
	fileRead.addEventListener('change', function() {
		var files = fileRead.files;
		if (files.length == 0) return;
		const file = files[0];
		//init variables
		var reader = new FileReader();
		var lines;
		reader.onload = (e) => { 
			const file = e.target.result; 
			theta = [];
			phi = [];
			lines = file.split(/\|/); // Split the string using the '|'
			for(var i = 0; i < lines.length; i++){ // Split each array by using commas so we can read data
				lines[i] = lines[i].split(',');
			}
			console.log(lines);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clear previous buffers
			//Clear all arrays
			if(lines[0][0] == "true") walking = true;
			else walking = false;
			frameSpeed = parseFloat(lines[1][0]);
			curFrameSpeed = parseFloat(lines[2][0]); // get current frame speed from file
			for(var i = 0; i < lines[3].length; i++){  // get reccured points from the file
				theta.push(parseFloat(lines[3][i]));
			}
			for(var i = 0; i < lines[4].length; i++){  // get reccured points from the file
				phi.push(parseFloat(lines[4][i]));
			}
			for(var i = 0; i < numNodes; i++){
				initNodes(i);
			}
			//clear color
			gl.clearColor(0.0, 0.8, 1.0, 1.0);
		}; 
		
		reader.readAsText(file); // read from file
	});
	
	//add event listener to radio buttons
	var formType = document.forms["formType"].elements["type"];
	for(var i = 0, max = formType.length; i < max; i++) {
		formType[i].onclick = function() {
			selectedType = this.value;
		}
	}
	
	var formTorso = document.forms["formTorso"].elements["torso"];
	for(var i = 0, max = formTorso.length; i < max; i++) {
		formTorso[i].onclick = function() {
			selectedTorso = this.value;
		}
	}
	
	var formArm = document.forms["formArm"].elements["arm"];
	for(var i = 0, max = formArm.length; i < max; i++) {
		formArm[i].onclick = function() {
			selectedArm = this.value;
		}
	}
	
	var formSide = document.forms["formSide"].elements["side"];
	for(var i = 0, max = formSide.length; i < max; i++) {
		formSide[i].onclick = function() {
			selectedSide = this.value;
		}
	}
	
	var formArmPart = document.forms["formArmPart"].elements["armPart"];
	for(var i = 0, max = formArmPart.length; i < max; i++) {
		formArmPart[i].onclick = function() {
			selectedArmPart = this.value;
		}
	}
	
	//add event listener to walk animation checkbox
	document.getElementById("walk").onchange = function(){
		walking = this.checked;
		curFrame = 0;
	}

	//add event listeners to sliders
    document.getElementById("sliderTheta").onchange = function () {
        theta[findCurId()] = maxAngles[findCurId()] * event.srcElement.value / 100 ;
        initNodes(findCurId());

    };
	
	document.getElementById("sliderPhi").onchange = function () {
        phi[findCurId()] = maxAngles[findCurId()] * event.srcElement.value / 100;
        initNodes(findCurId());
    };
	
	document.getElementById("frameSpeed").onchange = function() {
		frameSpeed = -event.srcElement.value;
	};

	//initialize nodes
    for (i = 0; i < numNodes; i++) initNodes(i);

    render();
}

//walk animation for Spider
//It is made by using different angles for nodes in each frame which consist total of 24 frames
function walk(){
		
		theta[leftArm1UpperId] = walkUpperTheata[curFrame];
		phi[leftArm1UpperId] = walkUpperPhi[curFrame];
		theta[rightArm1UpperId] = -walkUpperTheata[(curFrame + 12) % 24];
		phi[rightArm1UpperId] = walkUpperPhi[(curFrame + 12) % 24];
		theta[rightArm2UpperId] = -walkUpperTheata[curFrame];
		phi[rightArm2UpperId] = walkUpperPhi[curFrame];
		theta[leftArm2UpperId] = walkUpperTheata[(curFrame + 12) % 24];
		phi[leftArm2UpperId] = walkUpperPhi[(curFrame + 12) % 24];
		theta[leftArm3UpperId] = walkUpperTheata[curFrame];
		phi[leftArm3UpperId] = walkUpperPhi[curFrame];
		theta[rightArm3UpperId] = -walkUpperTheata[(curFrame + 12) % 24];
		phi[rightArm3UpperId] = walkUpperPhi[(curFrame + 12) % 24];
		theta[rightArm4UpperId] = -walkUpperTheata[curFrame];
		phi[rightArm4UpperId] = walkUpperPhi[curFrame];
		theta[leftArm4UpperId] = walkUpperTheata[(curFrame + 12) % 24];
		phi[leftArm4UpperId] = walkUpperPhi[(curFrame + 12) % 24];
		phi[leftArm4MidId] = walkMiddlePhi[(curFrame + 12) % 24];
		phi[rightArm3MidId] = walkMiddlePhi[(curFrame + 12) % 24];
		phi[leftArm2MidId] = walkMiddlePhi[(curFrame + 12) % 24];
		phi[rightArm1MidId] = walkMiddlePhi[(curFrame + 12) % 24];
		phi[rightArm4MidId] = walkMiddlePhi[curFrame];
		phi[leftArm3MidId] = walkMiddlePhi[curFrame];
		phi[rightArm2MidId] = walkMiddlePhi[curFrame];
		phi[leftArm1MidId] = walkMiddlePhi[curFrame];
		phi[leftArm4LowerId] = walkLowerPhi[(curFrame + 12) % 24];
		phi[rightArm3LowerId] = walkLowerPhi[(curFrame + 12) % 24];
		phi[leftArm2LowerId] = walkLowerPhi[(curFrame + 12) % 24];
		phi[rightArm1LowerId] = walkLowerPhi[(curFrame + 12) % 24];
		phi[rightArm4LowerId] = walkLowerPhi[curFrame];
		phi[leftArm3LowerId] = walkLowerPhi[curFrame];
		phi[rightArm2LowerId] = walkLowerPhi[curFrame];
		phi[leftArm1LowerId] = walkLowerPhi[curFrame];
		theta[backTorsoId] = -walkBackTorsoTheta[curFrame];
		theta[leftUpperHeadId] = walkHeadTheta[curFrame];
		theta[leftLowerHeadId] = walkHeadTheta[curFrame];
		theta[rightUpperHeadId] = walkHeadTheta[curFrame];
		theta[rightLowerHeadId] = walkHeadTheta[curFrame];
		//initializes nodes
		for(var i =0; i < numNodes; i++){
			initNodes(i);
		}
		curFrame++;
		curFrame %= 24;

}

/*
	function for checking which radio buttons are chosen and finding which node they represent
	*/
function findCurId(){
	if(selectedType == 0){ //torso
		if(selectedTorso == 0){//front torso
			return torsoId;
		}
		else{//back torso
			return backTorsoId;
		}
	}
	else{ //head and arm
		if(selectedArm == 0){//head
				if(selectedSide == 1){//left
					if(selectedArmPart == 0) return leftUpperHeadId;
					else if(selectedArmPart == 2 ) return leftLowerHeadId;
				}
				else {//right
					if(selectedArmPart == 0) return rightUpperHeadId;
					else if(selectedArmPart == 2 ) return rightLowerHeadId;
				}
		}
		else if(selectedArm == 1){	//Arm 1	
				if(selectedSide == 1){//left
					if(selectedArmPart == 0) return rightArm1UpperId;
					else if(selectedArmPart == 1 ) return rightArm1MidId;
					else return rightArm1LowerId;
				}
				else {//right
					if(selectedArmPart == 0) return leftArm1UpperId;
					else if(selectedArmPart == 1 ) return leftArm1MidId;
					else return leftArm1LowerId;
				}
		}
		else if(selectedArm == 2){//Arm 2
				if(selectedSide == 1){//left
					if(selectedArmPart == 0) return rightArm2UpperId;
					else if(selectedArmPart == 1 ) return rightArm2MidId;
					else return rightArm2LowerId;
				}
				else {//right
					if(selectedArmPart == 0) return leftArm2UpperId;
					else if(selectedArmPart == 1 ) return leftArm2MidId;
					else return leftArm2LowerId;
				}
		}
		else if(selectedArm == 3){//Arm 3
				if(selectedSide == 1){//left
					if(selectedArmPart == 0) return rightArm3UpperId;
					else if(selectedArmPart == 1 ) return rightArm3MidId;
					else return rightArm3LowerId;
				}
				else {//right
					if(selectedArmPart == 0) return leftArm3UpperId;
					else if(selectedArmPart == 1 ) return leftArm3MidId;
					else return leftArm3LowerId;
				}
		}
		else{// Arm 4
				if(selectedSide == 1){//left
					if(selectedArmPart == 0) return rightArm4UpperId;
					else if(selectedArmPart == 1 ) return rightArm4MidId;
					else return rightArm4LowerId;
				}
				else {//right
					if(selectedArmPart == 0) return leftArm4UpperId;
					else if(selectedArmPart == 1 ) return leftArm4MidId;
					else return leftArm4LowerId;
				}
		}
	}
}
	
/*
* draws cylinder with given properties
*/
function drawCylinder(x, y, z, radiusX, radiusY, height, color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
    for (var i = 0; i < 2 * circleLength + sideLength; i++) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 16 * i, flatten(color))
    }
    instanceMatrix = mult(modelViewMatrix, translate(x, y, z));
    instanceMatrix = mult(instanceMatrix, scale4(radiusX, radiusY, height));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.drawArrays(gl.TRIANGLE_FAN, 0, circleLength);
    gl.drawArrays(gl.TRIANGLE_FAN, circleLength, circleLength);
    gl.drawArrays(gl.TRIANGLE_STRIP, 2 * circleLength, sideLength);
}

/*
* Determines the vertices of cylinder and adds them to pointsarray to add them into buffer
*/
function cylinder() {
    circleLength = 0;
    sideLength = 0;
    let longitudeBands = 64;
	//upper circle
    for (let i = 0; i < longitudeBands; i++) {
        let x = Math.cos(2 * Math.PI / longitudeBands * i);
        let y = Math.sin(2 * Math.PI / longitudeBands * i);
        let z = 1;
        pointsArray.push(vec4(x / 2, y / 2, z / 2, 1.0));
        circleLength++;
    }
	//lower circle
    for (let i = 0; i < longitudeBands; i++) {
        let x = Math.cos(2 * Math.PI / longitudeBands * i);
        let y = Math.sin(2 * Math.PI / longitudeBands * i);
        let z = 1;
        pointsArray.push(vec4(x / 2, y / 2, -z / 2, 1.0));
    }

	//side
    for (let i = 0; i < longitudeBands; i++) {
        pointsArray.push(pointsArray[i]);
        pointsArray.push(vec4(pointsArray[i][0], pointsArray[i][1], -pointsArray[i][2], 1));
        sideLength = sideLength + 2;
    }
    pointsArray.push(pointsArray[0]);
    pointsArray.push(vec4(pointsArray[0][0], pointsArray[0][1], -pointsArray[0][2], 1));
    sideLength = sideLength + 2;
}

/*
* draws sphere with given properties
*/
function drawSphere(x, y, z, radiusX, radiusY, radiusZ, color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
    for (var i = 2 * circleLength + sideLength; i < 2 * circleLength + sideLength + sphereLength; i++) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 16 * i, flatten(color))
    }
    instanceMatrix = mult(modelViewMatrix, translate(x, y, z));
    instanceMatrix = mult(instanceMatrix, scale4(radiusX, radiusY, radiusZ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.drawArrays(gl.TRIANGLES, 2 * circleLength + sideLength, sphereLength);
}

/*
* Determines the vertices of sphere and adds them to pointsarray to add them into buffer
*/
function sphere() {
    sphereLength = 0;
    let latitudeBands = 32;
    let longitudeBands = 32;
    let radius = 1;
    let sphereVertexPosition = [];
    // Calculate sphere vertex positions
    for (let latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
        let theta = latNumber * Math.PI / latitudeBands;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        for (let longNumber = 0; longNumber <= longitudeBands; ++longNumber) {
            let phi = longNumber * 2 * Math.PI / longitudeBands;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);

            let x = cosPhi * sinTheta * radius;
            let y = cosTheta * radius;
            let z = sinPhi * sinTheta * radius;

            sphereVertexPosition.push(vec4(x, y, z, 1.0));
        }
    }
	//Add vertices in a order that they can be drawn
    for (let latNumber = 0; latNumber < latitudeBands; ++latNumber) {
        for (let longNumber = 0; longNumber < longitudeBands; ++longNumber) {
            let first = (latNumber * (longitudeBands + 1)) + longNumber;
            let second = first + longitudeBands + 1;

            pointsArray.push(sphereVertexPosition[first]);
            pointsArray.push(sphereVertexPosition[second]);
            pointsArray.push(sphereVertexPosition[first + 1]);

            pointsArray.push(sphereVertexPosition[second]);
            pointsArray.push(sphereVertexPosition[second + 1]);
            pointsArray.push(sphereVertexPosition[first + 1]);
            sphereLength = sphereLength + 6;
        }
    }
}
/*
* draws cube with given properties
*/ 
function drawCube(x, y, z, xlength, ylength, zlength, color) {
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
    for (var i = 2 * circleLength + sideLength + sphereLength; i < 2 * circleLength + sideLength + sphereLength + cubeLength; i++) {
        gl.bufferSubData(gl.ARRAY_BUFFER, 16 * i, flatten(color))
    }
    instanceMatrix = mult(modelViewMatrix, translate(x, y, z));
    instanceMatrix = mult(instanceMatrix, scale4(xlength, ylength, zlength));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.drawArrays( gl.TRIANGLES, 2 * circleLength + sideLength + sphereLength, cubeLength );
}

//determine the vertices of cube
function cube()
{
    cubeLength = 0;
	//push squares to cube
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

//push vertices of quads to points array
function quad(a, b, c, d)
{
    var cubeVertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        pointsArray.push( cubeVertices[indices[i]] );
        cubeLength = cubeLength + 1;
    }
}

//render the scene
var render = function () {

    gl.clear(gl.COLOR_BUFFER_BIT);
	if(walking){ // change angles according to animation frame
		curFrameSpeed++;
		console.log(curFrameSpeed);
		console.log(frameSpeed);
		if(curFrameSpeed >= frameSpeed){
			walk();
			curFrameSpeed -= frameSpeed;
		}
	}
    traverse(torsoId);
    requestAnimFrame(render);
}
