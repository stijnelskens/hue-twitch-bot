# Hue Twitch Bot

Let the viewers control your Philips Hue lights with twitch chat.<br/>
*NOTE:* Only works if you have a Bridge.

For more documentation check out https://github.com/instafluff/ComfyJS and https://github.com/peter-murray/node-hue-api

## Setup

Create a custom reward so the viewers can use channel points to change your lights.
Or remove `flags.customReward` if you don't want to use custom rewards.

```
yarn install
```
Copy `config.example.js` to `config.js` and update accordingly.

## Run

```
yarn start
```

#### Color Commands: 
- !hue1 blue or !hue2 blue
- !hue1 green or !hue2 green
- !hue1 orange or !hue2 orange
- !hue1 pink or !hue2 pink
- !hue1 purple or !hue2 purple
- !hue1 red or !hue2 red
- !hue1 white or !hue2 white
- !hue1 yellow or !hue2 yellow

### Todos

 - ~~Update color codes~~
 - ~~Use on redeem~~
 - ~~Alert/flash on follow/subscribe~~
 - ~~Access multiple lights instead of one~~
   - ~~Used with setLightState and setGroupState~~


License
----

MIT

