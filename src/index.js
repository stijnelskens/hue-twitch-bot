const config = require('./config.js');
const colors = require('./colors.js');
const ComfyJS = require("comfy.js");
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const GroupLightState = v3.lightStates.GroupLightState;
const bridgeConnect = v3.discovery.nupnpSearch()
.then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(config.config.bridgeId);
})

ComfyJS.onCommand = (user, command, message, flags, extra) => {

    // Custom reward redeem to switch hue light
    // if (flags.customReward && command === "hue1") {
    if (command === "hue1") {

        if (!message.length) return;

        if (['pink', 'purple', 'orange', 'blue', 'green', 'yellow', 'red', 'white'].includes(message)) {
                
            colors.colors.find(color => {
                if (color.name == message) {
                    const briCode = color.bri;
                    const colorCode = color.code;
                    const satCode = color.sat;

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
                }
                return;
            });
        } else {
            return;
        }
    // target the second light
    // } else if (flags.customReward && command === "hue2") {
    } else if (command === "hue2") {

        if (!message.length) return;

        if (['pink', 'purple', 'orange', 'blue', 'green', 'yellow', 'red', 'white'].includes(message)) {
                
            colors.colors.find(color => {
                if (color.name == message) {
                    const briCode = color.bri;
                    const colorCode = color.code;
                    const satCode = color.sat;

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
                }
                return;
            });
        } else {
            return;
        }
    } else if (flags.customReward && command === "party") {

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

}

ComfyJS.onRaid = () => {
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

ComfyJS.onHosted = () => {
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

ComfyJS.onSub = () => {
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

ComfyJS.onResub = () => {
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

ComfyJS.onSubGift = () => {
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

ComfyJS.onSubMysteryGift = () => {
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

ComfyJS.onGiftSubContinue = () => {
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

ComfyJS.onCheer = () => {
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
