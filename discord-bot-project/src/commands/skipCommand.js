```javascript
const { MessageEmbed } = require('discord.js');
const musicService = require('./services/musicService');

module.exports = {
    name: 'skip',
    description: 'Skips the current song.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You need to be in a voice channel to skip music!');
            return;
        }

        musicService.skip();
        message.channel.send('Skipped to the next song.');
    }
};
```