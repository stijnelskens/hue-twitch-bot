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

            if (!args.length) return;

            if (args == 'pink' || args == 'purple' || args == 'orange' || args == 'blue' || args == 'green' || args == 'yellow' || args == 'red' || args == 'white') {
                
                const color = args.shift();

                for (let i = 0; i < colors.length; i+= 1) {

                    if (colors[i].name == color) {
                        const briCode = colors[i].bri;
                        const colorCode = colors[i].code;
                        const satCode = colors[i].sat;

                        v3.discovery.nupnpSearch(briCode, colorCode, satCode)
                            .then(searchResults => {
                                const host = searchResults[0].ipaddress;
                                return v3.api.createLocal(host).connect(USERNAME);
                            })
                            .then(api => {
                                // Using a LightState object to build the desired state
                                const state = new LightState()
                                    .on()
                                    .bri(briCode)
                                    .hue(colorCode)
                                    .sat(satCode)
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