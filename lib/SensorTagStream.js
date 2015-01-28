var stream = require('stream');
var util = require('util');
var SensorTag = require("sensortag");

function SensorTagStream(opts) {
    stream.Readable.call(this, opts);
    this._readableState.objectMode = true;
    // Flag whether tag events should should be queued for piping out in _read
    // There's probably a variable in the stream object
    this._piping = false;

    // Set up SensorTag event listeners
    var self = this;
    SensorTag.discover(function(sensorTag) {
        sensorTag.connect(function() {
            sensorTag.discoverServicesAndCharacteristics(function(){
                sensorTag.enableAccelerometer();
                sensorTag.notifyAccelerometer(function() {
                    console.log('notifyAccelerometer');
                });
                sensorTag.enableGyroscope();
                sensorTag.notifyGyroscope(function() {
                    console.log('notifyGyroscope');
                });
                sensorTag.notifySimpleKey(function() {
                    console.log('notify simplekey');
                });
            });

            sensorTag.on('accelerometerChange', function(x, y, z) {
                if(self._piping) {
                    var data = {
                        acceleromter : {x : x, y : y, z : z }
                    };
                    self.push(JSON.stringify(data));
                }
            });

            sensorTag.on('gyroscopeChange', function(x, y, z) {
                if(self._piping) {
                    var data ={
                        gyroscope : {x : x, y : y, z : z }
                    };
                    self.push(JSON.stringify(data));
                }
            });
            sensorTag.on('simpleKeyChange', function(left, right) {
                if(self._piping) {
                    var data ={
                        button : {left : left, right : right}
                    };
                    self.push(JSON.stringify(data));
                }
            });
        });
    });
}

util.inherits(SensorTagStream, stream.Readable);

SensorTagStream.prototype._read = function()  {
    this._piping = true;
};

module.exports = new SensorTagStream();

