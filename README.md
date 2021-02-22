# Hue Twitch Bot

Let the viewers control your Philips Hue lights with twitch chat.<br/>
*NOTE:* Only works if you have a Bridge. (You need your bridgeID)

For more documentation check out https://github.com/instafluff/ComfyJS and https://github.com/peter-murray/node-hue-api

## Setup

```
yarn install
```
Copy `config.example.js` to `config.js` and update accordingly.
and copy `.env.example` to `.env` and update accordingly to if you want to send chat messages. More info here https://github.com/instafluff/ComfyJS#sending-chat-messages

If you want to use it with custom rewards do the following:
Create a custom reward so the viewers can use channel points to change your lights.
Uncomment `flags.customReward` if you want to use custom rewards.


## Run

```
yarn start
```

#### Alerts
currently the lights listen to following events:
- onRaid
- onHosted
- onSub
- onResub
- onSubGift
- onSubMysteryGift
- onGiftSubContinue
- onCheer
With the effect of .effectColorLoop()

#### Color Commands for viewers: 
currently writting for 2 lights
- `!hue1 blue` or `!hue2 blue`
- `!hue1 green` or `!hue2 green`
- `!hue1 orange` or `!hue2 orange`
- `!hue1 pink` or `!hue2 pink`
- `!hue1 purple` or `!hue2 purple`
- `!hue1 red` or `!hue2 red`
- `!hue1 white` or `!hue2 white`
- `!hue1 yellow` or `!hue2 yellow`
Also added a dutch command `!lamp`.
Colors can be found in `src/colors.js`.

### Todos

 - ~~Update color codes~~
 - ~~Use on redeem~~
 - ~~Alert/flash on follow/subscribe~~
 - ~~Access multiple lights instead of one~~
   - ~~Used with setLightState and setGroupState~~


License
----

MIT

