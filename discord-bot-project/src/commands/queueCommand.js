```javascript
const { MessageEmbed } = require('discord.js');
const musicService = require('./services/musicService');

module.exports = {
    name: 'queue',
    description: 'Shows the current song queue.',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You need to be in a voice channel to see the queue!');
            return;
        }

        const queue = musicService.getQueue();

        if (queue.length === 0) {
            message.channel.send('The queue is empty.');
            return;
        }

        let queueText = 'Current queue:\n';
        queue.forEach((song, index) => {
            queueText += `${index + 1}. ${song.title} - ${song.artist}\n`;
        });

        const embed = new MessageEmbed()
            .setTitle('Song Queue')
            .setDescription(queueText);
        message.channel.send({ embeds: [embed] });
    }
};
```