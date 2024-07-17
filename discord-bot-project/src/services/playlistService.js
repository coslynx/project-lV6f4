```javascript
const { MessageEmbed } = require('discord.js');
const Playlist = require('./models/Playlist');
const musicService = require('./musicService');

class PlaylistService {
    constructor() {
        this.playlists = new Map();
    }

    createPlaylist(name) {
        const playlist = new Playlist(name);
        this.playlists.set(name, playlist);
        return Promise.resolve();
    }

    async addSongToPlaylist(playlistName, songId) {
        const playlist = this.playlists.get(playlistName);
        if (playlist) {
            await playlist.addSong(songId);
            return Promise.resolve();
        } else {
            return Promise.reject('Playlist not found.');
        }
    }

    async removeSongFromPlaylist(playlistName, songId) {
        const playlist = this.playlists.get(playlistName);
        if (playlist) {
            await playlist.removeSong(songId);
            return Promise.resolve();
        } else {
            return Promise.reject('Playlist not found.');
        }
    }

    async playPlaylist(voiceChannel, playlistName) {
        const playlist = this.playlists.get(playlistName);
        if (playlist) {
            const songs = await playlist.getSongs();
            songs.forEach(song => {
                musicService.addToQueue(voiceChannel, {
                    title: song.title,
                    url: song.url,
                    thumbnail: song.thumbnail
                });
            });
            if (!musicService.isPlaying()) {
                musicService.play();
            }
            return Promise.resolve();
        } else {
            return Promise.reject('Playlist not found.');
        }
    }

    async showPlaylist(playlistName) {
        const playlist = this.playlists.get(playlistName);
        if (playlist) {
            const songs = await playlist.getSongs();
            let playlistText = `Songs in playlist ${playlistName}:\n`;
            songs.forEach(song => {
                playlistText += `${song.title} - ${song.artist}\n`;
            });
            const embed = new MessageEmbed()
                .setTitle(playlistName)
                .setDescription(playlistText);
            return Promise.resolve(embed);
        } else {
            return Promise.reject('Playlist not found.');
        }
    }
}

module.exports = new PlaylistService();
```