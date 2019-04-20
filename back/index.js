const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./db');

const port = 3000;

// server.use(cors);

const genreKeys = Object.keys(db.types);

genreKeys
    .forEach(key => {
        const path = `/${key}`;
        server.get(path, (req, res, next) => {
            db.types[key]
                .findAll()
                .then(musics => {
                    const data = []
                    musics.forEach(music => {
                        const musicData = music.dataValues;

                        data.push(
                            {
                                ...musicData,
                                chords: JSON.parse(musicData.chords)
                            }
                        )
                    })
                    res.send(data);
                })
        });
    })

server.get('/generos', (req, res, next) => {
    const data = genreKeys.map((k, i) => {
        return {
            id: i,
            name: k,
            value: k,
        }
    })
    res.send(data);
})

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});