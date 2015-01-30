var ws = require('websocket-stream');
var stream = ws('ws://localhost:3000');

// Read the viewport width and height



// Global circle position
var circlePos = {
    // half the width and height
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
    // console.log('draw');
}







