require('dotenv').config();
const tmi = require('tmi.js');
const v3 = require('node-hue-api').v3;
const LightState = v3.lightStates.LightState;
const USERNAME = process.env.USERNAME, LIGHT_ID = process.env.ID;

const client = new tmi.Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    channels: [process.env.CHANNEL],
});
  
client.connect().catch(console.error);

client.on('message', (channel, tags, message, self) => {
	if (self) return;
    
    if (message.startsWith('!')) {
        const args = message.split(' ');
        const command = args.shift();

        if (command === '!hue') {

            // Colors
            const colors = [
                {
                    name: 'red',
                    code: '65535'
                },
                {
                    name: 'blue',
                    code: '46920'
                },
                {
                    name: 'green',
                    code: '25500'
                },
                {
                    name: 'pink',
                    code: '56101'
                },
                {
                    name: 'orange',
                    code: '5538'
                },
                {
                    name: 'yellow',
                    code: '9765'
                },
                {
                    name: 'white',
                    code: '41435'
                },
            ];

            if (!args.length) return;
            if (args == 'pink' || args == 'purple' || args == 'orange' || args == 'blue' || args == 'green' || args == 'yellow' || args == 'red' || args == 'white') {
                const color = args.shift();

                for (let i = 0; i < colors.length; i+= 1) {

                    if (colors[i].name == color) {
                        const colorCode = colors[i].code;
                        v3.discovery.nupnpSearch(colorCode)
                            .then(searchResults => {
                                const host = searchResults[0].ipaddress;
                                return v3.api.createLocal(host).connect(USERNAME);
                            })
                            .then(api => {
                                // Using a LightState object to build the desired state
                                const state = new LightState()
                                    .on()
                                    .hue(colorCode)
                                //  .alert('select')
                                ;
                                
                                return api.lights.setLightState(LIGHT_ID, state);
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
});