const client = require('./db');
const express = require('express');
const app = express();

app.listen(3000, console.log('server listening port 3000'));
app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

app.post('/toggle', async (req, res) => {
    await client.query(
        "UPDATE todos SET completed = NOT completed;"
    );
    res.end();
});

app.get('/gettodo', async (req, res) => {
    const todo = await client.query(
        "select todo, completed from todos;"
    );
    res.json(todo.rows[0]);
    res.end();
});
