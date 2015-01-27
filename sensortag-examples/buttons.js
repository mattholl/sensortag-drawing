var SensorTag = require("sensortag");

SensorTag.discover(function(sensorTag) {
    // console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.notifySimpleKey(function() {
                console.log('notify simplekey');
            });
        });
    });

    sensorTag.on('simpleKeyChange', function(left, right) {
        console.log('left :' + left);
        console.log('right :' + right);
    });

});
