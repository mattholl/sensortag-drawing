var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.notifyMagnetometer(function() {
                console.log('notifyMagnetometer');
            });
            sensorTag.notifyMagnetometer(function() {
                console.log('notifyMagnetometer');
            });

            sensorTag.readMagnetometer(function(x, y, z) {
                var data = {x : x, y : y, z : z };
                console.log(data);
            });
        });

        // NOT WORKING
        sensorTag.on('magnetometerChange', function(x, y, z) {
            var data = {x : x, y : y, z : z };
            console.log(data);
        });

    });

});
