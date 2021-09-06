import express, { json } from 'express';

const app = express();

app.use(express.json());

app.listen(3333, () => {
    console.log("Monke on 🐒🚀")
});

