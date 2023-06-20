const express = require('express');
const app = express();
const pool = require('./db');

app.listen(3000, console.log("server listening port 3000"));
app.use(express.static('public'));

app.get('/api', async (req, res) => {
    const getContent = await pool.query(
        "select * from content;"
    );
    res.json(getContent.rows);
    res.end();
});
