var SensorTag = require("sensortag");
exports.testConnect = function(test) {
    test.expect(3);
    SensorTag.discover(function(sensorTag) {
        // console.log(sensorTag);
        sensorTag.connect(function() {
            sensorTag.discoverServicesAndCharacteristics(function(){
                test.ok(true, "should be able to conect to the sensortag");
                console.log('rssi : ' + sensorTag._peripheral.rssi);
                test.ok(sensorTag.uuid);
                console.log('UUID : ' + sensorTag.uuid);
                test.ok(sensorTag.uuid);
                // sensorTag.disconnect();
                test.done();
            });
        });
    });
};