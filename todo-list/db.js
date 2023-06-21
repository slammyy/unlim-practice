const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
})

client.connect();

module.exports = client;
