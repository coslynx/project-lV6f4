```javascript
const { Client, Intents } = require('discord.js');
const musicService = require('./services/musicService');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.member.user.bot) return; 
    if (newState.channelID && !oldState.channelID) {
        // User joined a voice channel
        musicService.joinVoiceChannel(newState.channel);
    } else if (!newState.channelID && oldState.channelID) {
        // User left a voice channel
        musicService.leaveVoiceChannel(oldState.channel);
    }
});

client.on('messageCreate', message => {
    // Handle commands in commandHandler.js
});

client.login(process.env.DISCORD_TOKEN);
```