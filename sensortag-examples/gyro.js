var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    // console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableGyroscope();
            sensorTag.notifyGyroscope(function() {
                console.log('notifyGyroscope');
            });
        });

        sensorTag.on('gyroscopeChange', function(x, y, z) {
            var data = {x : x, y : y, z : z };
            console.log(data);
        });

    });

});
