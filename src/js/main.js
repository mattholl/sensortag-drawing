var ws = require('websocket-stream'),
    stream = ws('ws://localhost:3001');

var canvasEl = document.getElementById("canvas"),
    canvas = canvasEl.getContext("2d");

// Read the canvas element width and height
var canvasWidth = canvasEl.offsetWidth,
    canvasHeight = canvasEl.offsetHeight;

// Global circle position, start position
var circlePos = {
    x : canvasWidth / 2,
    y : canvasHeight /2
};

var frameRate = 60;

// Setup and draw loop
(function setup() {
    // Attach SensorTag data callback function
    stream.on('data', function(data) {
        var tagData = JSON.parse(data.toString());
        if(tagData.acceleromter) {
            circlePos.x += tagData.acceleromter.x * 100;
            circlePos.y += tagData.acceleromter.y * 100;
        }
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
    canvas.fillStyle = 'rgba(225,225,225,0.1)';
    canvas.fillRect(0, 0, canvasEl.width, canvasEl.height);

    drawCircle();
}

function drawCircle() {
    var radius = 5;
    canvas.beginPath();
    canvas.arc(circlePos.x, circlePos.y, radius, 0, 2 * Math.PI, false);
    canvas.fillStyle = '#962929';
    canvas.fill();
}





