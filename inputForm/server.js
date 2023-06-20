const express = require('express');
const app = express();

const { Pool } = require('pg');
require('dotenv');

const insertData = async (data) => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "inputdata",
        password: "password",
        port: 5432,
    })
    await pool.connect();
    await pool.query(
        `INSERT INTO entries (entry)
VALUES ('${data}');`
    );
    await pool.end();
};

app.listen(3000, console.log('server listening port 3000'));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.post('/api', (req, res) => {
    insertData(JSON.stringify(req.body).match(/:"(.*?)"/)[1]);
    res.end();
});
