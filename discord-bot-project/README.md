# Discord Music Bot

## Introduction

This project implements a Discord bot that plays music, manages playlists, and provides search functionality. It uses Node.js, Discord.js, and other libraries to interact with Discord, stream music from YouTube, and manage playlists.

## Prerequisites

* Node.js and npm (or yarn)
* Discord Developer Account
* Spotify Developer Account (optional for Spotify integration)

## Setup

1. **Create a Discord Bot Application:**
   * Visit the Discord Developer Portal [https://discord.com/developers/applications](https://discord.com/developers/applications) and create a new application.
   * Create a bot user under the application settings and obtain the bot token.
2. **Set up Environment Variables:**
   * Create a `.env` file in the project root directory.
   * Add the following variables:
      * `DISCORD_TOKEN=YOUR_BOT_TOKEN`
      * `SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID` (optional)
      * `SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET` (optional)
      * `YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY` 
      * `DATABASE_FILE=./data/database.sqlite`
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run the Bot:**
   ```bash
   npm start
   ```

## Usage

* **Invite the Bot to Your Server:**
   * In your Discord Developer Portal, go to your bot's application page and copy the bot's invite link.
   * Paste the link into a Discord server where you want to use the bot.
* **Commands:**
   * `!play <song name/url>`: Plays the specified song.
   * `!skip`: Skips the current song.
   * `!pause`: Pauses the current song.
   * `!resume`: Resumes playback.
   * `!queue`: Shows the current song queue.
   * `!volume <percentage>`: Adjusts the volume (0-100).
   * `!search <query>`: Searches for songs on YouTube or Spotify (optional).
   * `!playlist create <name>`: Creates a new playlist.
   * `!playlist add <playlist name> <song name/url>`: Adds a song to a playlist.
   * `!playlist remove <playlist name> <song name>`: Removes a song from a playlist.
   * `!playlist play <playlist name>`: Plays a playlist.
   * `!playlist show <playlist name>`: Shows the contents of a playlist.

## Contributing

Feel free to contribute to the project by submitting pull requests or reporting issues.

## License

This project is licensed under the MIT License.
