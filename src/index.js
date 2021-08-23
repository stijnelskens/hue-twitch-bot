require('dotenv').config();
const config = require('./config.js');
const colors = require('./colors.js');
const ComfyJS = require('comfy.js');
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const GroupLightState = v3.lightStates.GroupLightState;
const bridgeConnect = v3.discovery.nupnpSearch()
.then(searchResults => {
    const host = searchResults[0].ipaddress;
    return v3.api.createLocal(host).connect(config.bridgeId);
})

ComfyJS.onCommand = (user, command, message, flags, extra) => {

    // Custom reward redeem to switch hue light
    // if (flags.customReward && command === "hue1") {
    if (command == 'hue1' || command == 'lamp1') {

        if (!message.length) return;
        if (['pink', 'purple', 'orange', 'blue', 'green', 'yellow', 'red', 'white'].includes(message)) {   
            colors.find(color => {
                if (color.name == message) {
                    const rgbCode = color.rgb;
                    const lightId = config.lightId;
                    return changeLights(rgbCode, lightId);
                }
                return;
            });
        } else {
            ComfyJS.Say(`@${user}, command is niet volledig, gebruik '!lampen' voor meer uitleg! SeemsGood`);
        }
    // target the second light
    // } else if (flags.customReward && command === "hue2") {
    } else if (command == 'hue2' || command == 'lamp2') {

        if (!message.length) return;
        if (['pink', 'purple', 'orange', 'blue', 'green', 'yellow', 'red', 'white'].includes(message)) {    
            colors.find(color => {
                if (color.name == message) {
                    const rgbCode = color.rgb;
                    const lightId = config.lightId2;
                    return changeLights(rgbCode, lightId);
                }
                return;
            });
        } else {
            ComfyJS.Say(`@${user}, command is niet volledig, gebruik '!lampen' voor meer uitleg! SeemsGood`);
        }
    } else if (flags.customReward && command === 'party') {
        alertLight();
    } else if (command == 'drop') {
        if (extra.sinceLastCommand.any > 60000) {
            setTimeout(function(){ 
                ComfyJS.Say('!drop KappaRoss');
            }, 1200);
        }
    }
}

ComfyJS.onRaid = () => {
    alertLight();
}

ComfyJS.onHosted = () => {
    alertLight();
}

ComfyJS.onSub = () => {
    alertLight();
}

ComfyJS.onResub = () => {
    alertLight();
}

ComfyJS.onSubGift = () => {
    alertLight();
}

ComfyJS.onSubMysteryGift = () => {
    alertLight();
}

ComfyJS.onGiftSubContinue = () => {
    alertLight();
}

ComfyJS.onCheer = () => {
    alertLight();
}

ComfyJS.Init(process.env.TWITCHUSER, process.env.OAUTH);

function alertLight() {
    bridgeConnect.then(api => {
        const groupState = new GroupLightState()
            .on()
            .effectColorLoop()
            .alert('lselect');

        const groupStateStop = new GroupLightState()
            .on()
            .effectNone()
            .alertNone();
            
        return api.groups.setGroupState(config.groupId, groupState)
        .then(result => {
            setTimeout(function(){ 
                return api.groups.setGroupState(config.groupId, groupStateStop);
            }, 10000);
        });
    });
}

function changeLights(rgbCode, lightId) {
    bridgeConnect.then(api => {
        // Using a LightState object to build the desired state
        const lightState = new LightState()
            .on()
            .rgb(rgbCode);
        return api.lights.setLightState(lightId, lightState);
    });
}