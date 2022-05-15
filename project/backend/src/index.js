const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

require('dotenv').config();

const dbConnData = {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    database: process.env.PGDATABASE || 'postgres',
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'password'
};

const { Client } = require('pg')
const client = new Client(dbConnData)

client
    .connect()
    .then(() => {
        console.log('Connected to PostgresSQL');
        const port = process.env.PORT || 5000
        app.listen(port, () => {
            console.log(`API server listening at http://localhost:${port}`);
        });
    })
    .catch(err => console.error('Connection error', err.stack));

app.get('/tracks', async (req, res) => {
    const result = await client.query('SELECT * FROM top50;');
    return res.send(
        result.rows
    )
})

app.get('/tracks/:id', async (req, res) => {
    const id = req.params.id;
    const result = await client.query(`SELECT DATE(creation_date), * FROM top50 WHERE id=${id}`)
    return res.send(result.rows)
})

app.post('/tracks', async (req, res) => {
    const posted = await client.query(`INSERT INTO top50 (track_name, artist_name, genre, bpm, energy, danceability, loudness, liveness, valence, length, acousticness, img)
    VALUES ('${req.body.track_name}', '${req.body.artist_name}',
    '${req.body.genre}', '${req.body.bpm}',
    '${req.body.energy}', '${req.body.danceability}', '${req.body.loudness}',
    '${req.body.liveness}', '${req.body.valence}',
    '${req.body.length}', '${req.body.acousticness}',
    '${req.body.img}');`)
    return res.send(posted);
  });

app.delete('/tracks/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await client.query(`DELETE FROM top50 WHERE id=${id}`)
    return res.send(`Deleted row with id=${id}`)
})

app.put('/tracks/:id', async (req, res) => {
    const message = {
        toInsert: req.body
      };
    const id = req.params.id
    const updated = await client.query(`UPDATE top50 
    SET
    track_name='${req.body.track_name}', 
    artist_name='${req.body.artist_name}',
    genre='${req.body.genre}', 
    bpm='${req.body.bpm}', 
    energy='${req.body.energy}', 
    danceability='${req.body.danceability}', 
    loudness='${req.body.loudness}',
    liveness='${req.body.liveness}', 
    valence='${req.body.valence}', 
    length='${req.body.length}', 
    acousticness='${req.body.acousticness}',  
    img='${req.body.img}'
    WHERE id=${id};`)
    return res.send(message)
})

app.get('/tracks/:sortType/:asc', async (req, res) => {
    const sortType = req.params.sortType
    const asc = req.params.asc
    const result = await client.query(`SELECT * FROM top50 ORDER BY ${sortType} ${asc}`);
    return res.send(
        result.rows
    )
})

app.get('/artists', async (req, res) => {
    const result = await client.query(`SELECT * FROM artists`);
    return res.send(
        result.rows
    )
})

app.get('/artists/:id/tracks', async (req, res) => {
    const id = req.params.id
    const result = await client.query(`SELECT track_name, top50.id FROM top50, artists WHERE artists.id=${id} AND artists.artist_name=top50.artist_name`);
    return res.send(
        result.rows
    )
})

app.get('/track/artist/:id', async (req, res) => {
    const id = req.params.id
    const result = await client.query(`SELECT artists.id FROM artists, top50 WHERE top50.id=${id} AND artists.artist_name=top50.artist_name`);
    return res.send(
        result.rows
    )
})

app.post('/artists', async (req, res) => {
    const message = {
      toInsert: req.body
    };
    const posted = await client.query(
    `INSERT INTO artists (artist_name, popularity, birth_date)
    VALUES ('${req.body.artist_name}', '${req.body.popularity}', '${req.body.birth_date}');`)
    return res.send(message);
  });

app.put('/artists/:id', async (req, res) => {
const message = {
    toInsert: req.body
};
const id = req.params.id
const updated = await client.query(`UPDATE artists 
SET
artist_name='${req.body.artist_name}', 
popularity='${req.body.popularity}',
birth_date='${req.body.birth_date}'
WHERE id=${id};`)
return res.send(message);
});

app.delete('/artists/:id', async (req, res) => {
    const id = req.params.id;
    const deleted = await client.query(`DELETE FROM artists WHERE id=${id}`)
    return res.send(`Deleted row with id=${id}`)
})

app.get('/artists/:sortType/:asc', async (req, res) => {
    const sortType = req.params.sortType
    const asc = req.params.asc
    const result = await client.query(`SELECT * FROM artists ORDER BY ${sortType} ${asc}`);
    return res.send(
        result.rows
    )
})


