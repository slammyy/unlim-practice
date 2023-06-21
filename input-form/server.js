require('dotenv').config();
const express = require('express');
const app = express();

const { Pool } = require('pg');

const insertData = async (data) => {
    const pool = new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    })
    await pool.connect();
    await pool.query(
        `INSERT INTO content (text) VALUES ('${data}');`
    );
    await pool.end();
};

app.listen(3000, console.log('server listening port 3000'));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.post('/api', (req, res) => {
    insertData(req.body.value.trim());
    res.end();
});
