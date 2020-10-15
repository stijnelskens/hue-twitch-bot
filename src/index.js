const config = require('./config.js');
const ComfyJS = require("comfy.js");
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const GroupLightState = v3.lightStates.GroupLightState;
const bridgeConnect = v3.discovery.nupnpSearch()
.then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(config.config.bridgeId);
})

// Colors
const colors = [
    {
        name: 'red',
        bri: '254',
        code: '64999',
        sat: '254'
    },
    {
        name: 'blue',
        bri: '254',
        code: '46920',
        sat: '254'
    },
    {
        name: 'green',
        bri: '254',
        code: '23209',
        sat: '254'
    },
    {
        name: 'pink',
        bri: '254',
        code: '59359',
        sat: '254'
    },
    {
        name: 'purple',
        bri: '254',
        code: '48593',
        sat: '254'
    },
    {
        name: 'orange',
        bri: '254',
        code: '3274',
        sat: '254'
    },
    {
        name: 'yellow',
        bri: '254',
        code: '11298',
        sat: '254'
    },
    {
        name: 'white',
        bri: '254',
        code: '41435',
        sat: '77'
    },
];

ComfyJS.onCommand = (user, command, message, flags, extra) => {

    // Custom reward redeem to switch hue light
    // if (flags.customReward && command === "hue1") {
    if (command === "hue1") {

        if (!message.length) return;

        if (message == 'pink' || message == 'purple' || message == 'orange' || message == 'blue' || message == 'green' || message == 'yellow' || message == 'red' || message == 'white') {
                
            const color = message;

            for (let i = 0; i < colors.length; i+= 1) {

                if (colors[i].name == color) {
                    const briCode = colors[i].bri;
                    const colorCode = colors[i].code;
                    const satCode = colors[i].sat;

                    bridgeConnect
                        .then(api => {
                            // Using a LightState object to build the desired state
                            const lightState = new LightState()
                                .on()
                                .bri(briCode)
                                .hue(colorCode)
                                .sat(satCode);
                            
                            return api.lights.setLightState(config.config.lightId, lightState);
                        });
                    break;
                }
            }
        } else {
            return;
        }
    // target the second light
    // } else if (flags.customReward && command === "hue2") {
    } else if (command === "hue2") {

        if (!message.length) return;

        if (message == 'pink' || message == 'purple' || message == 'orange' || message == 'blue' || message == 'green' || message == 'yellow' || message == 'red' || message == 'white') {
                
            const color = message;

            for (let i = 0; i < colors.length; i+= 1) {

                if (colors[i].name == color) {
                    const briCode = colors[i].bri;
                    const colorCode = colors[i].code;
                    const satCode = colors[i].sat;

                    bridgeConnect
                        .then(api => {
                            // Using a LightState object to build the desired state
                            const lightState = new LightState()
                                .on()
                                .bri(briCode)
                                .hue(colorCode)
                                .sat(satCode);
                            
                            return api.lights.setLightState(config.config.lightId2, lightState);
                        });
                    break;
                }
            }
        } else {
            return;
        }
    }
}

ComfyJS.onRaid = (user, command, message, flags, extra) => {
    bridgeConnect
        .then(api => {
            const groupState = new GroupLightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const groupStateStop = new GroupLightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.groups.setGroupState(config.config.groupId, groupState)
            .then(result => {
                setTimeout(function(){ 
                    return api.groups.setGroupState(config.config.groupId, groupStateStop);
                }, 8000);
            });
        });
}

ComfyJS.onSub = (user, command, message, flags, extra) => {
    bridgeConnect
        .then(api => {
            const groupState = new GroupLightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const groupStateStop = new GroupLightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.groups.setGroupState(config.config.groupId, groupState)
            .then(result => {
                setTimeout(function(){ 
                    return api.groups.setGroupState(config.config.groupId, groupStateStop);
                }, 8000);
            });
        });
}

ComfyJS.onCheer = (user, command, message, flags, extra) => {
    bridgeConnect
        .then(api => {
            const groupState = new GroupLightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const groupStateStop = new GroupLightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.groups.setGroupState(config.config.groupId, groupState)
            .then(result => {
                setTimeout(function(){ 
                    return api.groups.setGroupState(config.config.groupId, groupStateStop);
                }, 8000);
            });
        });
}

ComfyJS.Init(config.config.channelName);
