```javascript
const { MessageEmbed } = require('discord.js');
const musicService = require('./services/musicService');

module.exports = {
    name: 'volume',
    description: 'Sets the volume of the player.',
    execute(message, args) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You need to be in a voice channel to adjust the volume!');
            return;
        }

        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 100) {
            message.reply('Please enter a valid volume percentage (0-100).');
            return;
        }

        musicService.setVolume(volume / 100);
        message.channel.send(`Volume set to ${volume}%`);
    }
};
```