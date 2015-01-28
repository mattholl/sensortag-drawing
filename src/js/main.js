var ws = require('websocket-stream');

var stream = ws('ws://localhost:3000');
stream.on('data', function(data) {
    console.log(data.toString());
});