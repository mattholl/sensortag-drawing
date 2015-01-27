var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableAccelerometer();
            sensorTag.notifyAccelerometer(function() {
                console.log('notifyAccelerometer');
            });
        });

        sensorTag.on('accelerometerChange', function(x, y, z) {
            var data = {x : x, y : y, z : z };
            console.log(data);
        });

    });

});