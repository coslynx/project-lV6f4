```javascript
const { MessageEmbed } = require('discord.js');
const musicService = require('./services/musicService');

module.exports = {
    name: 'pause',
    description: 'Pauses the current song.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You need to be in a voice channel to pause music!');
            return;
        }

        if (musicService.isPlaying()) {
            musicService.pause();
            message.channel.send('Music paused.');
        } else {
            message.channel.send('Music is already paused.');
        }
    }
};
```