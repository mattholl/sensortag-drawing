var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    // console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableGyroscope();
            sensorTag.readGyroscope(function(x, y, z) {
                console.log('\tx = %d °/s', x.toFixed(1));
                console.log('\ty = %d °/s', y.toFixed(1));
                console.log('\tz = %d °/s', z.toFixed(1));
            });

            sensorTag.notifyGyroscope(function() {
                console.log('gyro set up');
            });
        });

        sensorTag.on('gyroscopeChange', function(x, y, z) {
            console.log('\tx = %d °/s', x.toFixed(1));
            console.log('\ty = %d °/s', y.toFixed(1));
            console.log('\tz = %d °/s', z.toFixed(1));
        });

    });

});
