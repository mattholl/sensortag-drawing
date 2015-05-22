# sensortag-drawing prototype

This project uses a node.js with a [Texas Instruments BLE SensorTag](http://www.ti.com/ww/en/wireless_connectivity/sensortag/index.shtml?INTC=SensorTag&HQS=sensortag) to stream data to all connected browsers over websockets. This data is then used to update the position of an object on an HTML5 canvas drawing.

Requires node v0.10.x.

npm install and run node app.js to create a web socket server push data from the SensorTag to a drawing canvas loaded on localhost:3001.

