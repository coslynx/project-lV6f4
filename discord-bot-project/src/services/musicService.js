```javascript
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

class MusicService {
    constructor() {
        this.voiceConnection = null;
        this.audioPlayer = createAudioPlayer();
        this.queue = [];
        this.currentSong = null;
        this.volume = 1;

        this.audioPlayer.on('stateChange', (oldState, newState) => {
            if (newState.status === 'idle' && this.queue.length > 0) {
                this.playNextSong();
            }
        });
    }

    joinVoiceChannel(channel) {
        this.voiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        this.voiceConnection.subscribe(this.audioPlayer);
    }

    leaveVoiceChannel(channel) {
        if (this.voiceConnection) {
            this.voiceConnection.disconnect();
            this.voiceConnection = null;
        }
    }

    addToQueue(channel, song) {
        this.queue.push(song);

        if (!this.voiceConnection) {
            this.joinVoiceChannel(channel);
        }

        return Promise.resolve();
    }

    play() {
        if (this.queue.length === 0) return;

        this.currentSong = this.queue.shift();
        const stream = ytdl(this.currentSong.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Opus });

        this.audioPlayer.play(resource);
    }

    playNextSong() {
        if (this.queue.length > 0) {
            this.play();
        }
    }

    skip() {
        if (this.audioPlayer.state.status === 'playing') {
            this.audioPlayer.stop();
            this.playNextSong();
        } else {
            this.playNextSong();
        }
    }

    pause() {
        this.audioPlayer.pause();
    }

    resume() {
        this.audioPlayer.unpause();
    }

    setVolume(volume) {
        this.volume = volume;
        this.audioPlayer.setVolumeLogarithmic(volume);
    }

    isPlaying() {
        return this.audioPlayer.state.status === 'playing';
    }

    getQueue() {
        return this.queue;
    }
}

module.exports = new MusicService();
```