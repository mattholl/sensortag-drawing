var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableAccelerometer();

            sensorTag.readAccelerometer(function(x, y, z) {
                console.log('\tx = %d G', x.toFixed(1));
                console.log('\ty = %d G', y.toFixed(1));
                console.log('\tz = %d G', z.toFixed(1));
            });
            sensorTag.notifyAccelerometer(function() {
                console.log('accelerometer set up');
            });

        });

        sensorTag.on('accelerometerChange', function(x, y, z) {
          console.log('\tx = %d G', x.toFixed(1));
          console.log('\ty = %d G', y.toFixed(1));
          console.log('\tz = %d G', z.toFixed(1));
        });

    });

});