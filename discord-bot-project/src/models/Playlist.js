```javascript
const sqlite3 = require('sqlite3').verbose();

class Playlist {
    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database('./data/database.sqlite');

        this.db.run(`CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            song_id INTEGER,
            FOREIGN KEY (song_id) REFERENCES songs (id)
        )`);
    }

    async addSong(songId) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO playlists (name, song_id) VALUES (?, ?)`, [this.name, songId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async removeSong(songId) {
        return new Promise((resolve, reject) => {
            this.db.run(`DELETE FROM playlists WHERE name = ? AND song_id = ?`, [this.name, songId], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async getSongs() {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * FROM playlists WHERE name = ?`, [this.name], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = Playlist;
```