import express from 'express';

const app = express();

app.use(express.static('source/public'));

export default app;