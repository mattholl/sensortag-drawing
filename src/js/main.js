var ws = require('websocket-stream'),
    stream = ws('ws://localhost:3000');

var canvasEl = document.getElementById("canvas"),
    canvas = canvasEl.getContext("2d");

// Read the canvas element width and height
var canvasWidth = canvasEl.offsetWidth,
    canvasHeight = canvasEl.offsetHeight;

// Global circle position
var circlePos = {
    x : canvasWidth / 2,
    y : canvasHeight /2
};

var frameRate = 60;

// Setup and draw loop
(function setup() {
    stream.on('data', function(data) {
        var tagData = JSON.parse(data.toString());
        console.log(tagData);
    });
    update();
})();

function update() {
    setTimeout(function() {
        requestAnimationFrame(update);
        draw();
    }, 1000 / frameRate);
}

function draw() {
    // TODO Clear with opacity
    drawCircle();
}

function drawCircle() {
    var radius = 5;
    canvas.beginPath();
    canvas.arc(circlePos.x, circlePos.y, radius, 0, 2 * Math.PI, false);
    canvas.fillStyle = '#962929';
    canvas.fill();
}





