var SensorTag = require("sensortag");
exports.testAccelerometer = function(test) {

    test.expect(3);
    SensorTag.discover(function(sensorTag) {
        sensorTag.connect(function() {
            sensorTag.discoverServicesAndCharacteristics(function(){
                console.log('Enable gyroscope');
                sensorTag.enableMagnetometer();

                sensorTag.readMagnetometer(function(x, y, z) {
                    test.equal(typeof(x), 'number');
                    test.equal(typeof(y), 'number');
                    test.equal(typeof(z), 'number');

                    console.log('\tx = %d', x);
                    console.log('\ty = %d', y);
                    console.log('\tz = %d', z);

                    test.done();
                });

            });
        });
    });
};