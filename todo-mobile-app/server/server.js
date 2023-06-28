import express from 'express';
import router from './routes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = process.env.NODEPORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(router);
app.listen(port, console.log(`server listening port ${port}`));
