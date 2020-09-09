require('dotenv').config();
const ComfyJS = require("comfy.js");
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const GroupLightState = v3.lightStates.GroupLightState;
const USERNAME = process.env.USERNAME, LIGHT_ID = process.env.SINGLELIGHTID, GROUP_ID = process.env.GROUPID;
const bridgeConnect = v3.discovery.nupnpSearch()
.then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(USERNAME);
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
    if (flags.customReward && command === "hue" ) {

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
                            const groupState = new GroupLightState()
                                .on()
                                .bri(briCode)
                                .hue(colorCode)
                                .sat(satCode);
                            
                            return api.groups.setGroupState(2, groupState);
                        })
                        .then(result => {
                            console.log(`Light state change was successful? ${result}`);
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
    console.log(user + ' Raided');
    bridgeConnect
        .then(api => {
            // Using a LightState object to build the desired state
            const state = new LightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const stateStop = new LightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.lights.setLightState(LIGHT_ID, state)
            .then(result => {
                setTimeout(function(){ 
                    return api.lights.setLightState(LIGHT_ID, stateStop);
                }, 8000);
            });
        })
        .then(result => {
            console.log(`Raid done ${result}`);
        });
}

ComfyJS.onSub = (user, command, message, flags, extra) => {
    console.log(user + ' Subscribed');
    bridgeConnect
        .then(api => {
            // Using a LightState object to build the desired state
            const state = new LightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const stateStop = new LightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.lights.setLightState(LIGHT_ID, state)
            .then(result => {
                setTimeout(function(){ 
                    return api.lights.setLightState(LIGHT_ID, stateStop);
                }, 8000);
            });
        })
        .then(result => {
            console.log(`Sub done ${result}`);
        });
}

ComfyJS.onCheer = (user, command, message, flags, extra) => {
    console.log(user + ' Cheered');
    bridgeConnect
        .then(api => {
            // Using a LightState object to build the desired state
            const state = new LightState()
                .on()
                .effectColorLoop()
                .alert('lselect');

            const stateStop = new LightState()
                .on()
                .effectNone()
                .alertNone();
                
            return api.lights.setLightState(LIGHT_ID, state)
            .then(result => {
                setTimeout(function(){ 
                    return api.lights.setLightState(LIGHT_ID, stateStop);
                }, 8000);
            });
        })
        .then(result => {
            console.log(`Cheer done? ${result}`);
        });
}

ComfyJS.Init(process.env.CHANNEL);
