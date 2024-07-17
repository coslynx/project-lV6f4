```javascript
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
const musicService = require('./services/musicService');
const searchService = require('./services/searchService');

module.exports = {
    name: 'play',
    description: 'Plays a song from YouTube or Spotify.',
    execute(message, args) {
        const query = args.join(' ');
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.reply('You need to be in a voice channel to play music!');
            return;
        }

        searchService.search(query).then(results => {
            if (results.length === 0) {
                message.reply('No results found.');
                return;
            }

            const song = results[0];
            musicService.addToQueue(voiceChannel, song).then(() => {
                if (!musicService.isPlaying()) {
                    musicService.play();
                }

                const embed = new MessageEmbed()
                    .setTitle(`Added to queue: ${song.title}`)
                    .setURL(song.url)
                    .setThumbnail(song.thumbnail);
                message.channel.send({ embeds: [embed] });
            });
        });
    }
};
```