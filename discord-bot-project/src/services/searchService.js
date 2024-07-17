```javascript
const fetch = require('node-fetch');

class SearchService {
    constructor() {
        this.youtubeApiKey = process.env.YOUTUBE_API_KEY;
        this.spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
        this.spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    }

    async search(query) {
        // Search on YouTube
        const youtubeResponse = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${this.youtubeApiKey}`);
        const youtubeData = await youtubeResponse.json();

        const youtubeResults = youtubeData.items.map(item => ({
            title: item.snippet.title,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnail: item.snippet.thumbnails.default.url
        }));

        // Search on Spotify (optional)
        // const spotifyResponse = await fetch('https://accounts.spotify.com/api/token', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + Buffer.from(this.spotifyClientId + ':' + this.spotifyClientSecret).toString('base64')
        //     },
        //     body: 'grant_type=client_credentials'
        // });

        // const spotifyToken = await spotifyResponse.json().access_token;

        // const spotifySearchResponse = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        //     headers: {
        //         'Authorization': `Bearer ${spotifyToken}`
        //     }
        // });

        // const spotifyData = await spotifySearchResponse.json();

        // const spotifyResults = spotifyData.tracks.items.map(item => ({
        //     title: item.name,
        //     url: item.external_urls.spotify,
        //     thumbnail: item.album.images[0].url
        // }));

        // Combine results
        return [...youtubeResults];
    }
}

module.exports = new SearchService();
```